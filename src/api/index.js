import axios from "axios";

// Conexão com o serviço de jogadores
export const playersApi = axios.create({
  baseURL: "http://localhost:3000",
});
// Conexão com o serviço de favoritos
export const favoritesApi = axios.create({
  baseURL: "http://localhost:3003",
});

//Dados mocados
/*export*/ const players = [
    {
        id: 1,
        name: 'Niko',        
        team:'Faze Clan',
        score: '95',
        avatar: require('../assets/players/1_niko.png')
    },
    {
        id: 2,
        name: 'Rain',        
        team:'Faze Clan',
        score: '95',
        avatar: require('../assets/players/2_rain.png')
    },
    {
        id: 3,
        name: 'Fer',        
        team:'Sk Gaming',
        score: '92',
        avatar: require('../assets/players/3_fer.png')
    },
    {
        id: 4,
        name: 'Coldzera',        
        team:'Sk Gaming',
        score: '90',
        avatar: require('../assets/players/4_cold.png')
    },
    {
        id: 5,
        name: 'Fallen',        
        team:'Sk Gaming',
        score: '85',
        avatar: require('../assets/players/5_fallen.png')
    },
    {
        id: 6,
        name: 'Shox',        
        team:'G2',
        score: '85',
        avatar: require('../assets/players/6_shox.png')
    },
    {
        id: 7,
        name: 'Dupreeh',        
        team:'Astralis',
        score: '87',
        avatar: require('../assets/players/7_dupreeh.png')
    },
    {
        id: 8,
        name: 'Boltz',        
        team:'Sk Gaming',
        score: '87',
        avatar: require('../assets/players/8_boltz.png')
    },
    {
        id: 9,
        name: 'Gla1ve',        
        team:'Faze Clan',
        score: '81',
        avatar: require('../assets/players/9_gla1ve.png')
    },
    {
        id: 10,
        name: 'Xyp9x',        
        team:'Astralis',
        score: '81',
        avatar: require('../assets/players/10_xyp9x.png')
    },
    {
        id: 11,
        name: 'Taco',        
        team:'Sk Gaming',
        score: '74',
        avatar: require('../assets/players/11_taco.png')
    },
    {
        id: 12,
        name: 'Dev1ce',        
        team:'Astralis',
        score: '80',
        avatar: require('../assets/players/12_dev1ce.png')
    },
    {
        id: 13,
        name: 'Karrigan',        
        team:'Faze Clan',
        score: '78',
        avatar: require('../assets/players/13_karrigan.png')
    },
    {
        id: 14,
        name: 'Apex',        
        team:'G2',
        score: '86',
        avatar: require('../assets/players/14_Apex.png')
    },
    {
        id:15,
        name: 'Rez',        
        team:'Ninja in Pyjamas',
        score: '90',
        avatar: require('../assets/players/15_rez.png')
    }    
]