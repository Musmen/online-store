import { NATIONS_VALUES, TYPES_VALUES } from '../../../../../common/common.constants';

export const SEPARATOR = ' ';

export type FilterCategoryNames = 'nation' | 'type';

export type SelectedOptions = { [name: string]: string[] };

export const FILTER_OPTIONS: { name: FilterCategoryNames; values: string[] }[] = [
  { name: 'nation', values: NATIONS_VALUES },
  { name: 'type', values: TYPES_VALUES },
];

export const FILTER_OPTIONS_TEMPLATES: {
  nation: { [key: string]: string };
  type: { [key: string]: string };
} = {
  nation: {
    germany: `<span class="flag flag_germany"></span>
              <span class="tanks-select__value">Germany</span>`,
    uk: `<span class="flag flag_uk"></span>
         <span class="tanks-select__value">U.K.</span>`,
    usa: `<span class="flag flag_usa"></span>
          <span class="tanks-select__value">U.S.A.</span>`,
    ussr: `<span class="flag flag_ussr"></span>
           <span class="tanks-select__value">U.S.S.R</span>`,
  },
  type: {
    lightTank: `<span class="tank-type tank-type_lighttank"></span>
                <span class="tanks-select__value">Light</span>`,
    mediumTank: `<span class="tank-type tank-type_mediumtank"></span>
                 <span class="tanks-select__value">Medium</span>`,
    heavyTank: `<span class="tank-type tank-type_heavytank"></span>
                <span class="tanks-select__value">Heavy</span>`,
    'AT-SPG': `<span class="tank-type tank-type_at-spg"></span>
               <span class="tanks-select__value">Antitank SPG</span>`,
  },
};
