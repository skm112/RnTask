

export const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
            .then(resp => resp.json())
        console.log(response)
        return response

    } catch (error) {
        console.log(error)
    }
}