export const STORAGE_KEYS = {
	LANGUAGE: 'language-preference',
	SCHEME: 'scheme-preference',
	USER_NAME: 'user-name',
} as const;

export const SESSION_KEYS = {
	NAME: 'p2p_name',
	PEER_ID: 'p2p_peer_id',
	ROLE: 'p2p_role',
	ROOM_ID: 'p2p_room_id',
	ROOM_STATE: 'p2p_room_state',
} as const;
