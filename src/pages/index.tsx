import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'
import { loadFirebase } from '../utils/firebase'
import { toast, Toaster } from 'react-hot-toast'
import Dashboard from '../pages/dashboard'
import { Sidebar } from '../components/Sidebar'


interface UserProps {
  name: string;
  email: string;
  image: string;
}
interface ProfilesProps {
  user: UserProps;
  level: number;
  challenges: number;
  currentxp: number;
  totalxp: number;
}

export default function Page({...pageProps}) {
  const [ session, loading ] = useSession()
  const router = useRouter()
  const profiles = pageProps.pageProps.profiles
  const userSession = pageProps.pageProps.session
  const notifyEmail = () => toast(`${userSession.user.name} precisamos do seu e-mail!, infelizmente seus dados não serão salvos`, {
    duration: 5000,
    style: {
      borderRadius: '10px',
      background: 'var(--title)',
      color: 'var(--shape)',
    },
    icon: '☹',
    role: 'status',
    ariaLive: 'polite',
  })
  const loadUser = useMemo(() => {
    if (userSession) {
      const emptyUser = {
        user: userSession.user,
        level: 1,
        challenges: 0,
        currentxp: 0,
        totalxp: 0,
      };
      (profiles.length < 1) && loadFirebase().ref('profiles').push(emptyUser)
      const filterUser = profiles.filter((data:ProfilesProps) => data.user.email === userSession.user.email)
      if (!filterUser) {
        loadFirebase()
        .ref("profiles")
        .push(userSession.user)
        console.log('User created', userSession.user.email)
        return userSession
      } else {
        const findUser = filterUser.find((data:ProfilesProps) => data.user.email === userSession.user.email)
        return findUser
      }
    }
  }, [])

  useEffect(() => {
    if (!(userSession || loading)) {
      router.push('/login')
    } else {
      router.push('/')
    }
  }, [userSession, loading])

  if (typeof window !== 'undefined' && loading) {
    return (
      <div className="loading">
        <span className="c-loader"></span>
      </div>
    )
  }
  if (session) {
    return (
      <div className="wrapper">
        <Toaster />
        <Sidebar toggleTheme={pageProps.toggleTheme} />
        <Dashboard user={loadUser} {...pageProps} />
      </div>
    )}
  return <p>Access Denied</p>
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const firebase = loadFirebase()
  const profiles = await new Promise((resolve, reject) => {
    firebase.ref('profiles')
      .get()
      .then(snapshot => {
        let data = []
        snapshot.forEach((user) => {
          if (!user.val().user.email || user.val().user.email === ""){
            firebase.ref('profiles').child(user.key).remove()
          }
          data.push(
            Object.assign({
              key: user.key
            }, user.val())
          )
        })
        resolve(data);
      })
      .catch(error => {
        reject([error]);
      })
  });
  return {
    props: { profiles, session },
  }
}

// export default function Home({ ...rest }) {
//   const [ session, loading ] = useSession()
//

//   return (

//   )
// }

// export const getServerSideProps:GetServerSideProps = async (context) => {
//   const session = await getSession(context)
//

//   return {
//     props: { profiles: result, session },
//   }
// }
