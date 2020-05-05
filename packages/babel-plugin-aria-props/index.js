module.exports = babel => ({
	name: 'babel-plugin-aria-props',
	visitor: {
		JSXOpeningElement: path => {
			const openingElement = path.node

			if (babel.types.react.isCompatTag(openingElement.name.name)) {
				openingElement.attributes.forEach(attrNode => {
					const attrIdentifier = attrNode.name

					if (ariaAttrTransforms.has(attrIdentifier.name)) {
						attrIdentifier.name = ariaAttrTransforms.get(attrIdentifier.name)
					}
				})
			}
		}
	}
})

const ariaAttrTransforms = new Map([
	['ariaAtomic', 'aria-atomic'],
	['ariaAutoComplete', 'aria-autocomplete'],
	['ariaBusy', 'aria-busy'],
	['ariaChecked', 'aria-checked'],
	['ariaColCount', 'aria-colcount'],
	['ariaColIndex', 'aria-colindex'],
	['ariaColIndexText', 'aria-colindextext'],
	['ariaColSpan', 'aria-colspan'],
	['ariaCurrent', 'aria-current'],
	['ariaDescription', 'aria-description'],
	['ariaDisabled', 'aria-disabled'],
	['ariaExpanded', 'aria-expanded'],
	['ariaHasPopup', 'aria-haspopup'],
	['ariaHidden', 'aria-hidden'],
	['ariaInvalid', 'aria-invalid'],
	['ariaKeyShortcuts', 'aria-keyshortcuts'],
	['ariaLabel', 'aria-label'],
	['ariaLevel', 'aria-level'],
	['ariaLive', 'aria-live'],
	['ariaModal', 'aria-modal'],
	['ariaMultiLine', 'aria-multiline'],
	['ariaMultiSelectable', 'aria-multiselectable'],
	['ariaOrientation', 'aria-orientation'],
	['ariaPlaceholder', 'aria-placeholder'],
	['ariaPosInSet', 'aria-posinset'],
	['ariaPressed', 'aria-pressed'],
	['ariaReadOnly', 'aria-readonly'],
	['ariaRelevant', 'aria-relevant'],
	['ariaRequired', 'aria-required'],
	['ariaRoleDescription', 'aria-roledescription'],
	['ariaRowCount', 'aria-rowcount'],
	['ariaRowIndex', 'aria-rowindex'],
	['ariaRowIndexText', 'aria-rowindextext'],
	['ariaRowSpan', 'aria-rowspan'],
	['ariaSelected', 'aria-selected'],
	['ariaSetSize', 'aria-setsize'],
	['ariaSort', 'aria-sort'],
	['ariaValueMax', 'aria-valuemax'],
	['ariaValueMin', 'aria-valuemin'],
	['ariaValueNow', 'aria-valuenow'],
	['ariaValueText', 'aria-valuetext']
])
