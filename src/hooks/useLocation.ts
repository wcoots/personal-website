import { useState } from 'react';
import { CountryName } from '../data/counties';
import { GeoLocationAPIResponse } from '@/types';
import { transformPosition } from '@/utils';

const SVG_UNITS_PER_DEGREE_LONGITUDE = 99.736466335; // represents 42.02 miles
const SVG_UNITS_PER_DEGREE_LATITUDE = 144.481381912; // represents 47.82 miles
const MOST_NORTHERLY_LATITUDE = 55.7888616; // northernmost point of England & Wales
const MOST_WESTERLY_LONGITUDE = -5.713303; // westernmost point of England & Wales

export function useLocation() {
  const [userLocation, setUserLocation] = useState<{ x: number; y: number } | null>(null);

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
      const response = await fetch(`/api/ip-information?ip=${ip}`, { cache: 'force-cache' });
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

    const transformedPosition = transformPosition(xPosition, yPosition, window.outerWidth);

    setUserLocation(transformedPosition);
  }

  return { userLocation, getLocation };
}
