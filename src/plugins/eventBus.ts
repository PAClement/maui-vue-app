import mitt from 'mitt';

type Events = {
    'product:received': any;
};

export const eventBus = mitt<Events>();