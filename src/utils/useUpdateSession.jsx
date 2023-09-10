import { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function useUpdateSession({ session, setActive }) {
  useEffect(() => {
    if (session !== null) {
      setActive(1)
    } else {
      setActive(0)
    }
  }, [session])
}

useUpdateSession.propTypes = {
  session: PropTypes.object,
  setActive: PropTypes.func.isRequired
}
