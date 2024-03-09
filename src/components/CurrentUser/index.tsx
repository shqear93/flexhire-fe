import React, {useEffect, useState} from 'react';
import {getBaseUrl} from "@/lib/utils";

const CurrentUserName = () => {
  const [userName, setUserName] = useState(null);

  const baseUrl = getBaseUrl();

  useEffect(() => {
    fetch(`${baseUrl}/api/current-user`)
      .then(response => response.json())
      .then(data => setUserName(data.currentUser.name))
      .catch(error => console.error(error));
  }, [baseUrl]);

  return (
    <div>
      {userName ? `Hello, ${userName}` : 'Loading...'}
    </div>
  );
}

export default CurrentUserName;