import slugify from './slugify'

export const elementList = ( world_id, slug ) => `/worlds/${world_id}/${slugify(slug)}/elements`;
export const element = ( wid, slug, eid ) => `/worlds/${wid}/${slugify(slug)}/elements/${eid}`;

export const characterList = ( world_id, slug ) => `/worlds/${world_id}/${slugify(slug)}/characters`;
export const character = ( cid, slug ) => `/characters/${cid}/${slugify(slug)}`;

export const outlineList = world_id => `/worlds/${world_id}/outlines`;
export const outline = ( wid, oid ) => `/worlds/${wid}/outlines/${oid}`;

export const worldList = () => `/worlds`;
export const world = ( world_id, slug ) => `/worlds/${world_id}/${slugify(slug)}`;

export const feedback = () => 'http://feedback.storyshopapp.com/';


// # World Lists
// /worlds/:wid/:slug/books
//
// # Books
// /books/:id/:slug
