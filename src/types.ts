export interface NewsAPI {
  sources: Sources[];
  categories: Categories[];
  items: Articles[];
}

export interface Sources {
  id: number;
  name: string;
}

export interface Categories {
  id: number;
  name: string;
}

export interface Articles {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  source_id: number;
  category_id: number;
}

export interface ArticleItemAPI {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
  text: string;
  category: Categories;
  source: Sources;
}

export interface RelatedArticlesAPI {
  items: Articles[];
}