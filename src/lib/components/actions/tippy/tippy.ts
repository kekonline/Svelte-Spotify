import tippy, { type ExtendedProps, hideOnEsc, hideOnPopperBlur, hideOthersOnOpen } from './tippy-plugins';
import 'tippy.js/dist/tippy.css';

//we add our own plugins to tippy from tippy-plugins

export default function (node: HTMLElement, options?: Partial<ExtendedProps>) {
    const plugins = [hideOnPopperBlur, hideOnEsc, hideOthersOnOpen];
    const _options = options ? { ...options, plugins } : { plugins };
    const instance = tippy(node, _options);
    return {
        update(newOptions: Partial<ExtendedProps>) {
            const _newOptions = newOptions ? { ...newOptions, plugins } : { plugins };
            instance.setProps(_newOptions);
        },
        destroy() {
            instance.destroy();
        }
    }
}