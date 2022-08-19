import Icon from './Icon'

const content = (
  <path
    d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
    fill="currentColor"
  />
)

export const ChevronRightIcon = ({ ...attributes }) => (
  <Icon content={content} {...attributes} />
)
