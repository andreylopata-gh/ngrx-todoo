const lesson = {
    meta: {},
    modules: [
        {
            meta: {},
            template: `
                #1fea234#
                <p>Watch the video and choose the right answer</p>
                <ul>
                    <li>Some option 1 #1fea235# remaining text</li>
                    <li>Some option 2 #1fea236# remaining text</li>
                </ul>
            `,
            replacers: {
                '1fea234': {
                    type: 'video',
                    src: 'https://youtube.com....',
                },
                '1fea235': {
                    type: 'select',
                    items: [
                        { text: 'Possibilities', id: 1 },
                        { text: 'Explore', id: 2 },
                        { text: 'Achive it?', id: 3 },
                        { text: 'Elementary', id: 4 },
                    ],
                },
                '1fea236': {
                    type: 'substituter',
                    items: [
                        'Lorem',
                        'ipsum',
                        { expected: 'dolor' },
                        'sit',
                        { expected: 'amet' },
                    ],
                    variants: ['ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit'],
                },
            },
        },
    ],
};
