app({
    // name: 'playground-seed-widget',
    ui: (form) => ({
        nesstedGroups: form.group({
            verticalLabels: true,
            items: () => ({
                Jack: form.str({ default: 'gold, Knight', group: 'illusration' }),
                AAAAA: form.group({
                    verticalLabels: true,
                    items: () => ({
                        Jack: form.str({ default: 'gold, Knight', group: 'illusration' }),
                        foo: form.group({
                            verticalLabels: true,
                            items: () => ({
                                Jack: form.str({ default: 'gold, Knight', group: 'illusration' }),
                                Queen: form.str({ default: 'gold, Queen', group: 'illusration' }),
                                King: form.str({ default: 'gold, King', group: 'illusration' }),
                            }),
                        }),
                        Queen: form.str({ default: 'gold, Queen', group: 'illusration' }),
                        King: form.str({ default: 'gold, King', group: 'illusration' }),
                    }),
                }),
                Queen: form.str({ default: 'gold, Queen', group: 'illusration' }),
                King: form.str({ default: 'gold, King', group: 'illusration' }),
            }),
        }),
    }),

    run: async (flow, form) => {
        flow.output_text(`form is: ${JSON.stringify(form, null, 4)}`)
    },
})
