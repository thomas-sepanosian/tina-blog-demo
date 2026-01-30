import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Custom badge component for visual indicator
const CustomFieldBadge = () => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm mb-2">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        Custom Field
    </span>
);

// Custom text input field with badge
export const EchoTextInput = wrapFieldsWithMeta(({ input }) => {
    return (
        <div className="flex flex-col">
            <CustomFieldBadge />
            <input
                type="text"
                placeholder="Enter text to echo..."
                value={input.value || ''}
                onChange={input.onChange}
                className="px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
        </div>
    );
});

// Custom number input field with badge
export const EchoCountInput = wrapFieldsWithMeta(({ input }) => {
    return (
        <div className="flex flex-col gap-2">
            <CustomFieldBadge />
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={input.value || 1}
                    onChange={(e) => input.onChange(parseInt(e.target.value) || 1)}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={input.value || 1}
                    onChange={(e) => input.onChange(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center"
                />
            </div>
        </div>
    );
});
