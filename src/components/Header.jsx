import { Link } from 'react-router-dom';

function Header() {
  const menu = [
    {
      id: 1,
      name: "HOME",
      url: "/"
    },
    {
      id: 2,
      name: "CALENDARIO",
      url: "/calendario"
    },
    {
      id: 3,
      name: "USUARIOS",
      url: "/usuarios"
    },
    {
      id: 4,
      name: "INFO",
      url: "/info"
    },
  ];

  return (
    <div className='flex items-center w-screen border-b-2'>
      <div className='w-[90px] h-[90px] bg-white'>
        <div>
          <Link to={"/"} >
          </Link>
        </div>
        <img src="./src/assets/gym.png" className='p-3' />
      </div>
      <div className='flex gap-14'>
        {menu.map(({ name, url }) => (
          <Link key={url} to={url}>
            <div className='cursor-pointer hover:underline '>
              <h2>{name}</h2>
            </div>
          </Link>
        )
        )}
      </div>

    </div>
  )
}

export default Header
