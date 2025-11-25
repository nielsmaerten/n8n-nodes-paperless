import { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
export declare function correspondentSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
export declare function customFieldSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
export declare function documentSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
export declare function documentTypeSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
export declare function storagePathSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
export declare function tagSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
export declare function documentNoteSearch(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult>;
