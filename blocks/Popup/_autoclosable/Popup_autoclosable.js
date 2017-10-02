import PropTypes from 'prop-types';
import { declMod } from 'bem-react-core';

export default declMod({ autoclosable : true }, {
    block : 'Popup',

    willInit() {
        this.__base(...arguments);

        this._isClickInside = false;

        this._onDocumentClick = this._onDocumentClick.bind(this);
        this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    },

    mods({ autoclosable }) {
        return { ...this.__base(...arguments), autoclosable };
    },

    didUpdate({ visible }) {
        if(visible !== this.props.visible)
            if(visible) {
                document.removeEventListener('click', this._onDocumentClick);
                document.removeEventListener('keydown', this._onDocumentKeyDown);
            } else {
                document.addEventListener('click', this._onDocumentClick);
                document.addEventListener('keydown', this._onDocumentKeyDown);
            }

        this.__base(...arguments);
    },

    _onDocumentClick() {
        this._isClickInside || this.props.onHide();
        this._isClickInside = false;
    },

    _onDocumentKeyDown(e) {
        if(e.key === 'Escape') {
            // NOTE: we call `preventDefault()` to prevent desktop Safari from exiting the full screen mode
            e.preventDefault();
            this.props.onHide();
        }
    }
}, {
    propTypes : {
        autoclosable : PropTypes.bool
    }
});
