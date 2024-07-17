export const getOtherMembers = (currentUserId, members) => {
    return members.filter(member => member.toString() !== currentUserId.toString())
}


export const getSockets = (users = []) => {

    const sockets = users.map((user) => userSocketIDS.get(user._id.toString()))

    return sockets

}