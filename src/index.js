import React, {Component} from 'react'
import {render} from 'react-dom'
import glamorous, {Div} from 'glamorous'
import {css} from 'glamor'
import matchSorter from 'match-sorter'
import starWarsNames from 'starwars-names'
// import planetFacts from 'planet-facts'
import MultiDownshift from './multi-downshift'

const items = starWarsNames.all.map(s => ({name: s, id: s.toLowerCase()}))

const Item = glamorous.div(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    height: 'auto',
    textAlign: 'left',
    borderTop: 'none',
    lineHeight: '1em',
    color: 'rgba(0,0,0,.87)',
    fontSize: '1rem',
    textTransform: 'none',
    fontWeight: '400',
    boxShadow: 'none',
    padding: '.8rem 1.1rem',
    whiteSpace: 'normal',
    wordWrap: 'normal',
  },
  ({isActive, isSelected}) => {
    const styles = []
    if (isActive) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        background: 'rgba(0,0,0,.03)',
      })
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700',
      })
    }
    return styles
  },
)
const onAttention = '&:hover, &:focus'

const Menu = glamorous.div({
  maxHeight: '20rem',
  overflowY: 'auto',
  overflowX: 'hidden',
  borderTopWidth: '0',
  outline: '0',
  borderRadius: '0 0 .28571429rem .28571429rem',
  transition: 'opacity .1s ease',
  boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
  borderColor: '#96c8da',
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderStyle: 'solid',
})

const ControllerButton = glamorous.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: 'transparent',
  border: '1px solid #ccc',
  cursor: 'pointer',
})

function advancedFilter(theItems, value) {
  return matchSorter(theItems, value, {
    keys: ['name'],
  })
}

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : null}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

class App extends React.Component {
  itemToString = item => (item ? item.name : '')
  handleChange = selectedItems => {
    console.log({selectedItems})
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}
        >
          {({
            getButtonProps,
            getRemoveButtonProps,
            isOpen,
            selectedItems,
            getItemProps,
            highlightedIndex,
          }) => (
            <div style={{width: 500, margin: 'auto'}}>
              <ControllerButton {...getButtonProps()}>
                <Div display="flex" marginRight={8}>
                  {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <Div
                          key={item.id}
                          marginRight={4}
                          backgroundColor="#ccc"
                        >
                          {item.name}{' '}
                          <span {...getRemoveButtonProps({item})}>x</span>
                        </Div>
                      ))
                    : 'Select a value'}
                </Div>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
              {!isOpen ? null : (
                <Menu>
                  {items.map((item, index) => (
                    <Item
                      key={item.id}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItems.includes(item),
                      })}
                    >
                      {item.name}
                    </Item>
                  ))}
                </Menu>
              )}
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
