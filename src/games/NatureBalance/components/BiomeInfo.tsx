import React from 'react';
import { Biome } from '../types';
import { BIOME_CONFIGS } from '../config';

interface BiomeInfoProps {
  biome: Biome;
}

const BIOME_INFO: Record<Biome, {
  importance: string[];
  funFacts: string[];
  threats: string[];
  conservation: string[];
}> = {
  floresta: {
    importance: [
      "Maior floresta tropical do mundo",
      "Regulação do clima global",
      "Biodiversidade única",
      "Produção de oxigênio",
      "Ciclo da água"
    ],
    funFacts: [
      "20% do oxigênio da Terra",
      "1/5 da água doce do mundo",
      "40.000 espécies de plantas",
      "1.300 espécies de aves"
    ],
    threats: [
      "Desmatamento",
      "Queimadas",
      "Mineração ilegal",
      "Expansão agrícola"
    ],
    conservation: [
      "Áreas protegidas",
      "Monitoramento por satélite",
      "Desenvolvimento sustentável",
      "Educação ambiental"
    ]
  },
  oceano: {
    importance: [
      "Regulação do clima",
      "Fonte de alimento",
      "Biodiversidade marinha",
      "Produção de oxigênio",
      "Absorção de CO2"
    ],
    funFacts: [
      "Produz 50% do oxigênio",
      "Maior habitat da Terra",
      "Milhares de espécies",
      "90% da vida na Terra"
    ],
    threats: [
      "Poluição plástica",
      "Pesca predatória",
      "Acidificação",
      "Derramamento de óleo"
    ],
    conservation: [
      "Áreas marinhas protegidas",
      "Pesca sustentável",
      "Limpeza dos oceanos",
      "Redução de plásticos"
    ]
  },
  caatinga: {
    importance: [
      "Único bioma exclusivamente brasileiro",
      "Adaptações únicas à seca",
      "Biodiversidade endêmica",
      "Recursos medicinais",
      "Regulação climática regional"
    ],
    funFacts: [
      "Plantas que sobrevivem até 3 anos sem chuva",
      "Mais de 1000 espécies de abelhas",
      "Árvores que perdem folhas na seca",
      "Animais com hábitos noturnos"
    ],
    threats: [
      "Desertificação",
      "Desmatamento",
      "Caça ilegal",
      "Sobrepastoreio"
    ],
    conservation: [
      "Uso sustentável da terra",
      "Preservação de espécies nativas",
      "Educação ambiental",
      "Manejo sustentável"
    ]
  },
  cerrado: {
    importance: [
      "Nascentes das principais bacias hidrográficas",
      "Alta biodiversidade",
      "Regulação do clima",
      "Corredor ecológico",
      "Recursos naturais"
    ],
    funFacts: [
      "Segunda maior formação vegetal do Brasil",
      "Mais de 10.000 espécies de plantas",
      "Árvores com raízes de até 20 metros",
      "Berço das águas do Brasil"
    ],
    threats: [
      "Expansão agrícola",
      "Queimadas",
      "Urbanização",
      "Mineração"
    ],
    conservation: [
      "Áreas protegidas",
      "Agricultura sustentável",
      "Restauração ecológica",
      "Preservação de nascentes"
    ]
  },
  pampa: {
    importance: [
      "Biodiversidade dos campos",
      "Regulação hídrica",
      "Pecuária sustentável",
      "Patrimônio cultural",
      "Controle da erosão"
    ],
    funFacts: [
      "Mais de 450 espécies de gramíneas",
      "Habitat do lobo-guará",
      "Campos naturais milenares",
      "Berço da cultura gaúcha"
    ],
    threats: [
      "Conversão em lavouras",
      "Espécies invasoras",
      "Sobrepastoreio",
      "Urbanização"
    ],
    conservation: [
      "Manejo sustentável",
      "Preservação cultural",
      "Áreas protegidas",
      "Pesquisa científica"
    ]
  },
  mataatlantica: {
    importance: [
      "Proteção de encostas",
      "Regulação hídrica",
      "Alta biodiversidade",
      "Controle do clima",
      "Recursos naturais"
    ],
    funFacts: [
      "Mais de 20.000 espécies de plantas",
      "7 das 9 maiores bacias do Brasil",
      "Mais antiga floresta do Brasil",
      "130 milhões de pessoas dependem dela"
    ],
    threats: [
      "Urbanização",
      "Desmatamento",
      "Especulação imobiliária",
      "Poluição"
    ],
    conservation: [
      "Corredores ecológicos",
      "Restauração florestal",
      "Educação ambiental",
      "Áreas protegidas"
    ]
  },
  pantanal: {
    importance: [
      "Maior planície alagada do mundo",
      "Regulação hídrica",
      "Biodiversidade única",
      "Controle de enchentes",
      "Turismo ecológico"
    ],
    funFacts: [
      "Maior concentração de onças-pintadas",
      "Mais de 650 espécies de aves",
      "80% da área alaga anualmente",
      "Berçário natural de peixes"
    ],
    threats: [
      "Queimadas",
      "Pecuária extensiva",
      "Assoreamento",
      "Pesca predatória"
    ],
    conservation: [
      "Turismo sustentável",
      "Preservação de habitats",
      "Monitoramento ambiental",
      "Controle de queimadas"
    ]
  },
  mangue: {
    importance: [
      "Berçário marinho",
      "Proteção costeira",
      "Filtro natural",
      "Sequestro de carbono",
      "Sustento de comunidades"
    ],
    funFacts: [
      "Raízes que respiram",
      "Árvores tolerantes ao sal",
      "Berçário de 70% dos peixes",
      "Proteção contra tsunamis"
    ],
    threats: [
      "Especulação imobiliária",
      "Poluição",
      "Carcinicultura",
      "Desmatamento"
    ],
    conservation: [
      "Restauração de áreas",
      "Proteção legal",
      "Educação ambiental",
      "Pesca sustentável"
    ]
  },
  recife: {
    importance: [
      "Berçário marinho",
      "Proteção costeira",
      "Biodiversidade",
      "Turismo",
      "Pesca"
    ],
    funFacts: [
      "25% da vida marinha",
      "Maior biodiversidade por m²",
      "Milhares de anos de idade",
      "Visíveis do espaço"
    ],
    threats: [
      "Aquecimento global",
      "Acidificação",
      "Poluição",
      "Pesca predatória"
    ],
    conservation: [
      "Áreas marinhas protegidas",
      "Monitoramento",
      "Restauração",
      "Turismo sustentável"
    ]
  },
  savana: {
    importance: [
      "Biodiversidade única",
      "Regulação climática",
      "Recursos naturais",
      "Patrimônio cultural",
      "Turismo"
    ],
    funFacts: [
      "Maior migração animal",
      "Adaptações únicas",
      "Árvores ancestrais",
      "Ciclos naturais"
    ],
    threats: [
      "Caça ilegal",
      "Fragmentação",
      "Mudanças climáticas",
      "Agricultura"
    ],
    conservation: [
      "Parques nacionais",
      "Corredores ecológicos",
      "Turismo sustentável",
      "Proteção da fauna"
    ]
  },
  tundra: {
    importance: [
      "Regulação climática global",
      "Armazenamento de carbono",
      "Biodiversidade única",
      "Ciclos migratórios",
      "Cultura indígena"
    ],
    funFacts: [
      "Solo permanentemente congelado",
      "Verões com sol 24h",
      "Adaptações extremas",
      "Migração de renas"
    ],
    threats: [
      "Aquecimento global",
      "Exploração de petróleo",
      "Mineração",
      "Poluição"
    ],
    conservation: [
      "Redução de emissões",
      "Áreas protegidas",
      "Pesquisa científica",
      "Preservação cultural"
    ]
  },
  deserto: {
    importance: [
      "Regulação climática",
      "Biodiversidade adaptada",
      "Recursos minerais",
      "Energia solar",
      "Cultura local"
    ],
    funFacts: [
      "Adaptações extremas",
      "Oásis naturais",
      "Dunas móveis",
      "Vida noturna ativa"
    ],
    threats: [
      "Desertificação",
      "Mineração",
      "Turismo predatório",
      "Mudanças climáticas"
    ],
    conservation: [
      "Uso sustentável da água",
      "Proteção de oásis",
      "Turismo responsável",
      "Preservação cultural"
    ]
  }
};

export default function BiomeInfo({ biome }: BiomeInfoProps) {
  const biomeConfig = BIOME_CONFIGS[biome];
  const info = BIOME_INFO[biome];

  return (
    <div className="glass-card p-4 rounded-lg space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{biomeConfig.name}</h3>
        <p className="text-sm opacity-75">{biomeConfig.description}</p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
            Importância para o Ecossistema
          </h4>
          <ul className="text-sm space-y-1">
            {info.importance.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
            Curiosidades
          </h4>
          <ul className="text-sm space-y-1">
            {info.funFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
            Principais Ameaças
          </h4>
          <ul className="text-sm space-y-1">
            {info.threats.map((threat, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>{threat}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Ações de Conservação
          </h4>
          <ul className="text-sm space-y-1">
            {info.conservation.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}