import { useEffect, useState } from 'react';
import chroma from 'chroma-js';
import { counties, County, CountyName, RegionName, CountryName } from '@/data/counties';
import { colourPallets, ColourPalletName } from '@/data/colours';

export function useCountySelection(userCounty: CountyName | null) {
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryName | null>(null);
  const [selectedColourPallet, setSelectedColourPallet] = useState<ColourPalletName>(
    (localStorage.getItem('pallet') as ColourPalletName) ?? 'teal',
  );
  const [degreesOfSeparation, setDegreesOfSeparation] = useState<CountyName[][] | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const mapBackground = document.getElementById('mapBackground');
    const handleDocumentClick = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const elements = document.elementsFromPoint(x, y);
      const countyPath = elements.find((element) => element.tagName === 'path');
      if (countyPath) {
        const countyName = countyPath.getAttribute('data-county-name');
        if (countyName) handleCountyClick(countyName as CountyName);
      } else {
        setDegreesOfSeparation(null);
        setSelectedCounty(null);
        setSelectedRegion(null);
        setSelectedCountry(null);
      }
    };

    mapBackground?.addEventListener('click', handleDocumentClick);

    return () => mapBackground?.removeEventListener('click', handleDocumentClick);
  }, []);

  function handleCountyClick(countyName: CountyName) {
    const county = counties.find((county) => county.name === countyName);

    setSelectedCounty((currentCounty) => {
      if (!county || county.name === currentCounty?.name) return null;
      setImageLoading(true);
      return county;
    });

    setDegreesOfSeparation(() => {
      if (county) return getDegressOfSeparation(county);
      return null;
    });

    setSelectedRegion(null);
    setSelectedCountry(null);
  }

  function handleRegionClick(regionName: RegionName) {
    setSelectedRegion(regionName);
    setSelectedCounty(null);
    setSelectedCountry(null);
  }

  function handleCountryClick(countryName: CountryName) {
    setSelectedCountry(countryName);
    setSelectedRegion(null);
    setSelectedCounty(null);
  }

  function handlePalletChange(pallet: ColourPalletName) {
    setSelectedColourPallet(pallet);
    localStorage.setItem('pallet', pallet);
  }

  function generatePolygonColour(county: County) {
    const colourPallet = colourPallets[selectedColourPallet];

    if (degreesOfSeparation && selectedCounty) {
      const chromaScale = chroma.scale(colourPallet.range);
      const degreeOfSeparation = degreesOfSeparation.findIndex((layer) => layer.includes(county.name));
      return chromaScale(degreeOfSeparation / degreesOfSeparation.length).hex();
    } else if (selectedRegion && county.regions.includes(selectedRegion)) {
      return colourPallet.range[1];
    } else if (selectedCountry && county.country === selectedCountry) {
      return colourPallet.range[0];
    } else if (selectedRegion && county.country === counties.find((c) => c.regions.includes(selectedRegion))?.country) {
      return colourPallet.secondLightest;
    } else if (!selectedCounty && !selectedRegion && !selectedCountry && county.name === userCounty) {
      return colourPallet.range[0];
    } else if (!selectedCounty && !selectedRegion && !selectedCountry && county.imageUrl) {
      return colourPallet.secondLightest;
    } else {
      return colourPallet.lightest;
    }
  }

  function getDegressOfSeparation(county: County) {
    const countiesBySeparation: CountyName[][] = [[county.name]];

    while (countiesBySeparation.flat().length < counties.length) {
      const allPreviousLayerCountyNames = countiesBySeparation.flat();
      const previousLayerCountyNames = countiesBySeparation[countiesBySeparation.length - 1];
      const previousLayerCounties = counties.filter((c) => previousLayerCountyNames.includes(c.name));
      const nextLayerCountyNames = previousLayerCounties
        .flatMap((c) => c.borderingCounties)
        .filter((c) => !allPreviousLayerCountyNames.includes(c));
      countiesBySeparation[countiesBySeparation.length] = Array.from(new Set(nextLayerCountyNames));
    }

    return countiesBySeparation;
  }

  return {
    selectedCounty,
    selectedRegion,
    selectedCountry,
    selectedColourPallet,
    imageLoading,
    setImageLoading,
    handleCountyClick,
    handleRegionClick,
    handleCountryClick,
    handlePalletChange,
    generatePolygonColour,
  };
}
