import author1Img from '../images/temp/AuthorUserExample1.jpg'
import author2Img from '../images/temp/AuthorUserExample3.jpg'
import author3Img from '../images/temp/AuthorUserExample2.jpg'
import userImg from '../images/temp/UserTest.jpg'

const author1 = { profileImage: author1Img.src, userName: "Levi W. Edgar"}    
const author2 = { profileImage: author2Img.src, userName: "K. C. Lemmor"}
const author3 = { profileImage: author3Img.src, userName: "Cristina L. Timber"}
const author4 = { profileImage: userImg.src, userName: "Linspector"}
const authorImages = [ author1, author2, author3, author4]

export function findUserImg( username ){

    for(let i = 0; i<authorImages.length; i++){
        if(authorImages[i].userName == username)
            return authorImages[i].profileImage
    }

    return null
}