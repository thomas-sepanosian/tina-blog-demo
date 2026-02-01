'use client';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksEcho } from '@/tina/__generated__/types';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { EchoTextInput, EchoCountInput } from '@/tina/fields/echo';

export const EchoBlock = ({ data }: { data: PageBlocksEcho }) => {
    const echoText = data.text || 'Echo';
    const repeatCount = Math.max(1, data.count || 3);

    // Configuration: never shrink below 20% of original
    const MIN_THRESHOLD = 0.2;
    const STARTING_FONT_SIZE = 4; // rem
    const ENDING_FONT_SIZE = STARTING_FONT_SIZE * MIN_THRESHOLD; // 0.8rem

    // Calculate how much to reduce each property per iteration
    const stepsCount = Math.max(1, repeatCount - 1);
    const fontSizeDecrement = (STARTING_FONT_SIZE - ENDING_FONT_SIZE) / stepsCount;
    const opacityDecrement = (1 - MIN_THRESHOLD) / stepsCount;
    const scaleDecrement = (1 - MIN_THRESHOLD) / stepsCount;

    // Generate array of echoing text elements
    const echoElements = Array.from({ length: repeatCount }, (_, index) => {
        const currentFontSize = Math.max(ENDING_FONT_SIZE, STARTING_FONT_SIZE - (index * fontSizeDecrement));
        const currentOpacity = Math.max(MIN_THRESHOLD, 1 - (index * opacityDecrement));
        const currentScale = Math.max(MIN_THRESHOLD, 1 - (index * scaleDecrement));

        return (
            <div
                key={index}
                className="text-center font-bold transition-all"
                style={{
                    fontSize: `${currentFontSize}rem`,
                    opacity: currentOpacity,
                    transform: `scale(${currentScale})`,
                }}
                data-tina-field={tinaField(data, `text`)}
            >
                {echoText}
            </div>
        );
    });

    return (
        <Section background={data.background!}>
            <div className="flex flex-col items-center gap-2 py-12" data-tina-field={tinaField(data,'text')}>
                {echoElements}
            </div>
        </Section>
    );
};

export const echoBlockSchema: Template = {
    name: 'echo',
    label: 'Echo',
    ui: {
        previewSrc: '/blocks/echo.png',
        defaultItem: {
            text: 'Echo',
            count: 5,
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Text',
            name: 'text',
            description: 'The text to repeat',
            ui: {
                component: EchoTextInput,
            },
        },
        {
            type: 'number',
            label: 'Repeat Count',
            name: 'count',
            description: 'How many times to repeat the text',
            ui: {
                component: EchoCountInput,
            },
        },
    ],
};

