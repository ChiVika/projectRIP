
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyProfile from '../components/profile';

function Profile({user}) {

    return (
        <>
        <MyProfile user={user}/>
        </>
    );
    }

export default Profile;