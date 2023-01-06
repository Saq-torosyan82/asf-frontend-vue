export const PLAYER_ADVANCE = 'player_advance';
export const PLAYER_TRANSFER = 'player_transfer';
export const ENDORSEMENT = 'endorsement';
export const MEDIA_RIGHTS = 'media_rights';
export const AGENT_FEES = 'agent_fees';

export default Object.freeze({
        'corporate' : [
            {
                value: PLAYER_TRANSFER,
                label: 'Player transfer'
            },
            {
                value: ENDORSEMENT,
                label: 'Commercial endorsement deal'
            },
            {
                value: MEDIA_RIGHTS,
                label: 'TV & media rights'
            }
        ],
        'agent' : [
            {
                value: ENDORSEMENT,
                label: 'Commercial endorsement deal'
            },
            {
                value: PLAYER_ADVANCE,
                label: 'Player Contract Advance'
            },
            {
                value: AGENT_FEES,
                label: 'Agent fees'
            },
        ],
        'athlete' : [
            {
                value: ENDORSEMENT,
                label: 'Commercial endorsement deal'
            },
            {
                value: PLAYER_ADVANCE,
                label: 'Player Contract Advance'
            },
        ]
});
