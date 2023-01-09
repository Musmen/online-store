import { ProductItem } from '../models/product-item.model';

export const mockedProductsOnlyWithNumericProperties = [
  {
    price: 51.5,
    amount: 19,
    tier: 1,
  },
  {
    price: 59.5,
    amount: 67,
    tier: 5,
  },
  {
    price: 65,
    amount: 30,
    tier: 7,
  },
  {
    price: 26,
    amount: 10,
    tier: 10,
  },
  {
    price: 31,
    amount: 59,
    tier: 10,
  },
] as ProductItem[];

export const mockedProductsWithInvalidData = [
  {
    price: NaN,
    amount: NaN,
    tier: NaN,
  },
  {
    price: 'sdfsdf',
    amount: '43x34',
    tier: undefined,
  },
  {
    price: '15px',
    amount: 'invalid',
    tier: 'zero',
  },
] as ProductItem[];

export const mockedFullProducts: ProductItem[] = [
  {
    description:
      'The M56 Artillery was intended to support airborne units as a light tank destroyer that could be transported by cargo planes or inserted by parachute or glider. The vehicle was mass-produced from 1953 through 1959, but did not prove popular and was soon replaced by the Sheridan light tank. The Scorpion was occasionally used to provide artillery support in Vietnam.\nThis Premium vehicle has a 20% bonus XP earn and a 35% bonus Silver earn.',
    short_name: 'M56',
    price: 51.5,
    amount: 19,
    nation: 'usa',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/f0d99efef7cc15cb1ad600bcd4b8a551.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/8aff08f92c1d6e9dfc6d405f80d1391a.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/354946f19afd4b4a25b62d2b9ccbe061.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/183a9ecc45312ede66abf5be670b340f.jpeg',
    ],
    tier: 7,
    id: 56353,
    type: 'AT-SPG',
    name: 'M56 Scorpion',
  },
  {
    description:
      'Developed starting in 1944 by English Electric as a possible replacement for the A43 Black Prince. Some components were unified with the A41 Centurion. In 1948, trials of a prototype were started which mounted a Centurion Mk. II turret and a 17-pounder gun. Due to changes in Armored Forces policy and doctrine, development proceeded no further. However, the design later served as a basis for several post-war heavy tanks.\nThis Premium vehicle has a 20% bonus XP earn and a 30% bonus Silver earn.',
    short_name: 'FV201 (A45)',
    price: 59.5,
    amount: 67,
    nation: 'uk',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/66daffac35b3c6708dd7e3f0beeb9ab6.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/9cac738c6b8ac2c69f50b2b549ac1f67.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/73f474879cf6baea6419147fceef929e.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/7e61566260644bd2bf962336c8ada555.jpeg',
    ],
    tier: 7,
    id: 55121,
    type: 'heavyTank',
    name: 'FV201 (A45)',
  },
  {
    description:
      'An medium tank conceived for breakthrough attacks on enemy fortifications. The design project was ready on October 5, 1943. No prototypes were built. However, the project became the basis for a heavy assault tank, the A39 Tortoise.\nThis Premium vehicle has a 20% bonus XP earn and a 38% bonus Silver earn.',
    short_name: 'AT 15A',
    price: 65,
    amount: 30,
    nation: 'uk',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/34b2f69d2250d82e7526068c802f880c.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/3343cce6af8a21d41a24cc13fdcea99a.jpg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/f3b4f79cf585a388b35d0da6f9a501f1.jpg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/bd94ca97d3cfe81d7b75e73ec5f1aaa8.jpg',
    ],
    tier: 7,
    id: 54097,
    type: 'AT-SPG',
    name: 'AT 15A',
  },
  {
    description:
      "A tank under Sergeant Bob Early's command, with serial number 26, used by Company E of the 32nd Armored Regiment of the 3rd Armored Division. This vehicle was one of the pilot T26E3s, which participated in Operation Zebra (to trial the Pershing tanks in Europe). In the battle for Cologne on May 6, 1945, Early's crew destroyed the German Panther in front of the Cologne Cathedral with three shots.\nThis Premium vehicle has a 20% bonus XP earn and a 30% bonus Silver earn.",
    short_name: 'Eagle 7',
    price: 26,
    amount: 10,
    nation: 'usa',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/4316510ea6c095b7c7ef55f575db9e38.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/2485ddbcc51ffb70d7f9ec21073df23b.jpg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/3b12811d74b8bee2a035d255368d514d.jpg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/8541679813a968c5e27592a965bd5c77.jpg',
    ],
    tier: 7,
    id: 59937,
    type: 'mediumTank',
    name: 'T26E3 Eagle 7',
  },
  {
    description:
      'Experimental tank on the basis of the Centurion medium tank. The vehicle was in development from 1956 through 1959. Never saw mass production. Technical decisions and innovations implemented on the FV4202 became the basis for the FV4201 Chieftain.',
    short_name: 'FV4202',
    price: 31,
    amount: 59,
    nation: 'uk',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/b4f57b756c7d26e8df6c4577cfaa9a5c.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/d0b68f2501b0ae3e73a7c35f68ab6f87.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/558c73d620ba1733712e7c64b704a4e2.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/17b167438606ece11f562f0eab8e7704.jpeg',
    ],
    tier: 10,
    id: 14929,
    type: 'mediumTank',
    name: 'FV4202',
  },
];

export const mockedSelectedProducts: ProductItem[] = [
  {
    description:
      'Developed starting in 1944 by English Electric as a possible replacement for the A43 Black Prince. Some components were unified with the A41 Centurion. In 1948, trials of a prototype were started which mounted a Centurion Mk. II turret and a 17-pounder gun. Due to changes in Armored Forces policy and doctrine, development proceeded no further. However, the design later served as a basis for several post-war heavy tanks.\nThis Premium vehicle has a 20% bonus XP earn and a 30% bonus Silver earn.',
    short_name: 'FV201 (A45)',
    price: 59.5,
    amount: 67,
    nation: 'uk',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/66daffac35b3c6708dd7e3f0beeb9ab6.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/9cac738c6b8ac2c69f50b2b549ac1f67.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/73f474879cf6baea6419147fceef929e.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/7e61566260644bd2bf962336c8ada555.jpeg',
    ],
    tier: 7,
    id: 55121,
    type: 'heavyTank',
    name: 'FV201 (A45)',
  },
  {
    description:
      "A tank under Sergeant Bob Early's command, with serial number 26, used by Company E of the 32nd Armored Regiment of the 3rd Armored Division. This vehicle was one of the pilot T26E3s, which participated in Operation Zebra (to trial the Pershing tanks in Europe). In the battle for Cologne on May 6, 1945, Early's crew destroyed the German Panther in front of the Cologne Cathedral with three shots.\nThis Premium vehicle has a 20% bonus XP earn and a 30% bonus Silver earn.",
    short_name: 'Eagle 7',
    price: 26,
    amount: 10,
    nation: 'usa',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/4316510ea6c095b7c7ef55f575db9e38.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/2485ddbcc51ffb70d7f9ec21073df23b.jpg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/3b12811d74b8bee2a035d255368d514d.jpg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/8541679813a968c5e27592a965bd5c77.jpg',
    ],
    tier: 7,
    id: 59937,
    type: 'mediumTank',
    name: 'T26E3 Eagle 7',
  },
  {
    description:
      'Experimental tank on the basis of the Centurion medium tank. The vehicle was in development from 1956 through 1959. Never saw mass production. Technical decisions and innovations implemented on the FV4202 became the basis for the FV4201 Chieftain.',
    short_name: 'FV4202',
    price: 31,
    amount: 59,
    nation: 'uk',
    images: [
      'https://catoolwebdav-net-cdn.gcdn.co/catool/b4f57b756c7d26e8df6c4577cfaa9a5c.png',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/d0b68f2501b0ae3e73a7c35f68ab6f87.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/558c73d620ba1733712e7c64b704a4e2.jpeg',
      'https://catoolwebdav-net-cdn.gcdn.co/catool/17b167438606ece11f562f0eab8e7704.jpeg',
    ],
    tier: 10,
    id: 14929,
    type: 'mediumTank',
    name: 'FV4202',
  },
];
