
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyProfile from '../components/profile';
import AddNotes from '../components/Notes';

function Profile({user}) {

    return (
        <>
        <MyProfile user={user}/>
        <AddNotes/>
        </>
    );
    }

export default Profile;