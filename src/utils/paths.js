export const elementList = world_id => `/app/worlds/${world_id}/elements`;
export const element = ( wid, eid ) => `/app/worlds/${wid}/elements/${eid}`;

export const characterList = world_id => `/app/worlds/${world_id}/characters`;
export const character = ( wid, cid ) => `/app/worlds/${wid}/characters/${cid}`;

export const outlineList = world_id => `/app/worlds/${world_id}/outlines`;
export const outline = ( wid, oid ) => `/app/worlds/${wid}/outlines/${oid}`;

export const worldList = () => `/app/worlds/`;
export const world = world_id => `/app/worlds/${world_id}/`;

export const feedback = () => 'http://feedback.storyshopapp.com/';

