type MyComponentProps<T> = {
  items: T[]
    defaultItem: T
}
function MyComponent<T>(props: MyComponentProps<T>) {
  console.log(props)
  return <p>some content</p>
}

const App = () => {
  const users: User[] = [
    { name: 'Bilbo', age: 111 },
    { name: 'Frodo', age: 33 },
  ]

  return (
    <>
      <MyComponent items={['react', 'typescript']} defaultItem={'css'} />
      <MyComponent items={users} defaultItem={{
        name: 'Maya',
        age: 123 }} />
    </>
  )
}

type User = {
  name: string
  age: number
}
