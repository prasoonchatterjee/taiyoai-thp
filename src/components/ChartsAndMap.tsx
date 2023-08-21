import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import { Line, LineChart, XAxis } from 'recharts';
import { handlePageNo } from '../store/rootReducer';
import { useDispatch } from 'react-redux';

const ChartsAndMap = () => {
  const [countryData, setCountryData] = useState<any>();
  const [cases, setCases] = useState<any>([]);
  const [deaths, setDeaths] = useState<any>([]);
  const [recovered, setRecovered] = useState<any>([]);
  const position: [number, number] = [51.505, -0.09];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const countryData = await axios.get(
        'https://disease.sh/v3/covid-19/countries'
      );
      const historicalData = await axios.get(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
      );
      setCountryData(countryData.data);
      setCases(Object.entries(historicalData.data.cases));
      setDeaths(Object.entries(historicalData.data.deaths));
      setRecovered(Object.entries(historicalData.data.recovered));
    };

    fetchData();
  }, []);

  const createChartData = () => {
    return cases.map((item: any, index: number) => {
      return {
        name: cases[index][0],
        active: cases[index][1],
        deaths: deaths[index][1],
        recovered: recovered[index][1],
      };
    });
  };

  const renderMarkers = () => {
    if (countryData?.length) {
      return countryData.map((country: any) => (
        <Marker
          position={[country.countryInfo.lat, country.countryInfo.long]}
          key={country.country}
        >
          <Popup>
            country:{country.country} <br />
            active:{country.active} <br />
            recoverd:{country.recovered} <br />
            deaths:{country.deaths} <br />
          </Popup>
        </Marker>
      ));
    }
  };

  return (
    <div className='flex flex-col max-w-7xl m-auto border-4 border-blue-700'>
      <header className='bg-blue-700 text-white text-center p-2 font-bold'>
        Maps and Charts
      </header>
      <main className='flex flex-col lg:flex-row'>
        <aside className='border-2 border-black flex flex-col basis-1/5'>
          <a
            onClick={() => dispatch(handlePageNo(1))}
            className='border border-black border-x-0 border-y-0 p-1 hover:cursor-pointer'
          >
            Contact
          </a>
          <a
            onClick={() => dispatch(handlePageNo(4))}
            className='border border-y-2 border-black border-x-0 p-1 hover:cursor-pointer'
          >
            Charts and map
          </a>
        </aside>
        <div className='basis-4/5'>
          <div className='w-4/5 m-auto my-4'>
            <MapContainer
              center={position}
              zoom={4}
              scrollWheelZoom={true}
              style={{ minHeight: '40vh' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              {renderMarkers()}
            </MapContainer>
          </div>
          <div className='border w-4/5 m-auto'>
            <LineChart
              width={
                window.matchMedia('(max-width: 640px)').matches ? 250 : 500
              }
              height={500}
              data={createChartData()}
              style={{ margin: 'auto', maxWidth: '500px' }}
            >
              <XAxis dataKey='name' />
              <Line type='linear' dataKey='active' stroke='blue' />
              <Line type='monotone' dataKey='deaths' stroke='red' />
              <Line type='monotone' dataKey='recovered' stroke='green' />
            </LineChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChartsAndMap;
