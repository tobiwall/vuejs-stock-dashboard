import axios from 'axios';

export const order = [
  'Mar 21', 'Jun 21', 'Sep 21', 'Dec 21',
  'Mar 22', 'Jun 22', 'Sep 22', 'Dec 22',
  'Mar 23', '""', 'Aug 23', 'Nov 23',
  'Feb 24', 'Mai 24', 'Aug 24'
];


// Funktion um Daten von einer spezifischen URL zu holen
export const getStockData = async (sheetName) => {
  try {
    const API_URL = `https://sheetdb.io/api/v1/iexe02tbg43of?sheet=$${sheetName}`;
    const response = await axios.get(API_URL);    
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};


// Funktion um spezifische Zeilen zu bekommen und zu sortieren
export const getSortedStockData = async (sheetName, rowIndex) => {
  try {
    const stockData = await getStockData(sheetName);
    const targetData = stockData[rowIndex];
    const entries = Object.entries(targetData);
    const sortedEntries = sortEntries(entries);
    const latestDate = entries[entries.length-1][0];
    
    return { sortedEntries, latestDate };
  } catch (error) {
    console.error('Error processing stock data:', error);
    throw error;
  }
};


const sortEntries = (entries) => {
  return entries.sort((a, b) => {
    const aDate = a[0];
    const bDate = b[0];
    const aIndex = order.indexOf(aDate);
    const bIndex = order.indexOf(bDate);

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
};