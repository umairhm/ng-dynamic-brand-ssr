import { TargetOptions } from '@angular-builders/custom-webpack';
import * as cheerio from 'cheerio';
import * as minfier from 'html-minifier';

export default (targetOptions: TargetOptions, indexHtml: string) => {
  const brand = process.env.BRAND || 'one';

  const $ = cheerio.load(indexHtml);

  $('#brand-style').attr('href', `${brand}.min.css`);

  const minified = minfier.minify($.html(), {
    removeComments: true,
    removeAttributeQuotes: true,
    collapseWhitespace: true,
  });

  return minified;
}