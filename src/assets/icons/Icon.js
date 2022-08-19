const Icon = ({ className, content, style, ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {content}
    </svg>
  )
}

export default Icon
