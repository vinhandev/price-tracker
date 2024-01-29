// pages/api/getPrice.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      'https://www.thegioididong.com/dtdd/iphone-13?code=0131491002653'
    );
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    // Use a CSS selector to target the price element (adjust this based on the website's structure)
    const priceElement = $('.price');

    // Extract the price text
    const priceText = priceElement.text();

    // Send the price as a JSON response
    res.status(200).json({ price: priceText });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
