import { useState } from 'react';
import { CountryName, CountyName } from '../data/counties';
import { GeoLocationAPIResponse } from '@/types';

const SVG_UNITS_PER_DEGREE_LONGITUDE = 99.736466335; // represents 42.02 miles
const SVG_UNITS_PER_DEGREE_LATITUDE = 144.481381912; // represents 47.82 miles
const MOST_NORTHERLY_LATITUDE = 55.7888616; // northernmost point of England & Wales
const MOST_WESTERLY_LONGITUDE = -5.713303; // westernmost point of England & Wales
const MAP_WIDTH_PIXELS = 1225; // width of SVG map
const MAP_HEIGHT_PIXELS = 845; // height of SVG map

export function useLocation() {
  const [userCounty, setUserCounty] = useState<CountyName | null>(null);

  function isValidCountryName(name: string): name is CountryName {
    return name === 'england' || name === 'wales';
  }

  async function getIpAddress(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip }: { ip: string } = await response.json();
      return ip;
    } catch (error) {
      console.error('ERROR OBTAINING IP', error);
      return null;
    }
  }

  async function getIpInformation(ip: string): Promise<GeoLocationAPIResponse['location'] | null> {
    try {
      // const response = await fetch(`/api/ip-information?ip=${ip}`, { cache: 'force-cache' }); // TODO: Uncomment this line
      const response = await fetch(`/api/ip-information?ip=${ip}`);
      return response.json();
    } catch (error) {
      console.error('ERROR OBTAINING IP INFORMATION', error);
      return null;
    }
  }

  async function getLocation() {
    const ip = await getIpAddress();
    if (!ip) return;

    const ipInformation = await getIpInformation(ip);
    if (!ipInformation) return;

    const { longitude, latitude, principalSubdivision } = ipInformation;
    const [country] = principalSubdivision.toLowerCase().split(' ');

    if (!isValidCountryName(country)) {
      return;
    }

    const xPosition = +((longitude - MOST_WESTERLY_LONGITUDE) * SVG_UNITS_PER_DEGREE_LONGITUDE).toFixed(2);
    const yPosition = +((MOST_NORTHERLY_LATITUDE - latitude) * SVG_UNITS_PER_DEGREE_LATITUDE).toFixed(2);

    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

    const xOffset = Math.max(0, (windowWidth - MAP_WIDTH_PIXELS) / 2);
    const yOffset = Math.max(0, (windowHeight - MAP_HEIGHT_PIXELS) / 2);

    const x = xPosition + xOffset;
    const y = yPosition + yOffset;

    const elements = document.elementsFromPoint(x, y);
    const countyName = elements
      .find((element) => element.nodeName === 'path')
      ?.attributes?.getNamedItem('data-county-name')?.value as CountyName | undefined;

    if (countyName) {
      setUserCounty(countyName || null);
    }
  }

  return { userCounty, getLocation };
}
