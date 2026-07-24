

function UserCard({user}) {
    return ( 
        <div className="border p-4 rounded-lg">
      <img
        src={user.photoUrl}
        alt={user.firstName}
        className="w-40"
      />

      <h1>
        {user.firstName} {user.lastName}
      </h1>

      <h2>Age: {user.age}</h2>

      <h2>Gender: {user.gender}</h2>

      <p>{user.about}</p>
    </div>
     );
}

export default UserCard;