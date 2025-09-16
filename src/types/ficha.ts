export interface FichaFoto {
  id: number;
  ficha_id: number;
  file: string;
  created_at: string;
  updated_at: string;
  url_new: string;
}

export interface FichaCapa {
  id: number;
  ficha_id: number;
  file: string;
  created_at: string;
  updated_at: string;
  url_new: string;
}

export interface Ficha {
  id: number;
  categoria: 'fauna' | 'flora' | 'invertebrado';
  descricao: string;
  familia_id: number;
  nome_cientifico: string;
  nomes_comum: string;
  distribuicao_habitat: string;
  fonte: string | null;
  fonte_nome: string | null;
  tipo_agua: 'doce' | 'salgada';
  ph_min: number | null;
  ph_max: number | null;
  dureza_min: number | null;
  dureza_max: number | null;
  temp_min: number | null;
  temp_max: number | null;
  tamanho_max: number | null;
  tamanho_comum: number | null;
  estimativa_vida: string | null;
  alimentacao: string | null;
  dimorfismo: string | null;
  litragem: string | null;
  iluminacao: string | null;
  substrato_fertil: string | null;
  co2: string | null;
  demanda: string | null;
  cultivo_emerso: string | null;
  video_ficha: string | null;
  video_ficha2: string | null;
  video_canal: string | null;
  created_at: string;
  updated_at: string;
  slug: string;
  valor_custo: number | null;
  valor_venda: number | null;
  fotos: FichaFoto[];
  capa: FichaCapa | null;
}

export interface FichaFilters {
  buscar?: string;
  ph_min?: number;
  ph_max?: number;
  categoria?: 'fauna' | 'flora' | 'invertebrado';
  familia?: string;
  litragem_min?: number;
  litragem_max?: number;
}

export type FichaListResponse = Ficha[];
