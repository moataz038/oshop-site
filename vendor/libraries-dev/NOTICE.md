# Libraries.dev vendor note

The local browser bundle uses the MIT-licensed free components `border-beam@1.4.1` and `voice-ring@0.2.0` from [Libraries.dev](https://github.com/Jakubantalik/Libraries.dev), with React and React DOM `18.3.1`. Original license texts for both components, React, React DOM, Scheduler, loose-envify and js-tokens are kept in `licenses/`.

The source entry is `tools/kb-libraries-effects.js`; the pre-bundled ESM asset is `dist/kb-libraries-effects.js`. Border Beam decorates the existing composer, while Voice Ring reads KB's already-available `window.__kbOrbInputLevel` and `window.__kbOrbOutputLevel`; this entry does not import `useMicrophone`, call `getUserMedia`, or request a permission. Only free MIT features are used; no Pro or paid component is included.
