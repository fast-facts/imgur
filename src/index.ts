import { ImgurClient } from 'imgur';
export { ImgurClient, ImgurCredentials, ImgurApiResponse, getAuthorizationHeader } from 'imgur';

const client = new ImgurClient({ clientId: 'f0ea04148a54268' });
export function plainRequest(...args: ArgumentTypes<ImgurClientType['plainRequest']>) { return client.plainRequest(...args); }
export function request(...args: ArgumentTypes<ImgurClientType['request']>) { return client.request(...args); }
export function deleteImage(...args: ArgumentTypes<ImgurClientType['deleteImage']>) { return client.deleteImage(...args); }
export function favoriteImage(...args: ArgumentTypes<ImgurClientType['favoriteImage']>) { return client.favoriteImage(...args); }
export function getAlbum(...args: ArgumentTypes<ImgurClientType['getAlbum']>) { return client.getAlbum(...args); }
export function getAccount(...args: ArgumentTypes<ImgurClientType['getAccount']>) { return client.getAccount(...args); }
export function getAlbums(...args: ArgumentTypes<ImgurClientType['getAlbums']>) { return client.getAlbums(...args); }
export function createAlbum(...args: ArgumentTypes<ImgurClientType['createAlbum']>) { return client.createAlbum(...args); }
export function getAlbumsIds(...args: ArgumentTypes<ImgurClientType['getAlbumsIds']>) { return client.getAlbumsIds(...args); }
export function getGallery(...args: ArgumentTypes<ImgurClientType['getGallery']>) { return client.getGallery(...args); }
export function getSubredditGallery(...args: ArgumentTypes<ImgurClientType['getSubredditGallery']>) { return client.getSubredditGallery(...args); }
export function searchGallery(...args: ArgumentTypes<ImgurClientType['searchGallery']>) { return client.searchGallery(...args); }
export function getImage(...args: ArgumentTypes<ImgurClientType['getImage']>) { return client.getImage(...args); }
export function updateImage(...args: ArgumentTypes<ImgurClientType['updateImage']>) { return client.updateImage(...args); }
export function upload(...args: ArgumentTypes<ImgurClientType['upload']>) { return client.upload(...args); }

type ImgurClientType = InstanceType<typeof ImgurClient>;
// eslint-disable-next-line @typescript-eslint/ban-types
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;