import logo from '../../assets/logo.png';

export default function Logo() {
  return (
    <div
    className='d-none d-md-block'
      style={{
        width: 200,
        height: undefined,
        aspectRatio: 2,
        paddingLeft: 20,
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        src={logo}
      />
    </div>
  );
}
