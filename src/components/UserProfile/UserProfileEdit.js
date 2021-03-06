import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserProfileEdit.css';
import Remove from "../../assets/svg/remove.svg"
import Add from "../../assets/svg/add.svg"

const UserProfileEdit = (props) => {
    
    const [profilePicture, setProfilePicture] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [externalCV, setExternalCV] = useState('');
    const [enteredJob, setEnteredJob] = useState('');
    const [jobs, setJobs] = useState([]);
    const [enteredEducation, setEnteredEducation] = useState('');
    const [education, setEducation] = useState([]);
    const [enteredSkill, setEnteredSkill] = useState('');
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {


        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('/app/api/user', config);
        setAddress(res.data.user.address);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        setCountry(res.data.user.country);
        setSkills(res.data.user.skills);
        setEducation(res.data.user.education);
        setJobs(res.data.user.jobs);
        if (res.data.user.external_cv === null) {
            setExternalCV('');
        }
        else {
            setExternalCV(res.data.user.external_cv);
        }
    }

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    }

    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    }

    const provinceChangeHandler = (event) => {
        setProvince(event.target.value);
    }

    const countryChangeHandler = (event) => {
        setCountry(event.target.value);
    }

    const jobsInputChangeHandler = (event) => {
        setEnteredJob(event.target.value);
    }

    const jobsRemoveHandler = (id) => {
        setJobs(jobs.filter(job => id !== job.id));
        deleteJobsHandler(id);
    };

    const educationInputChangeHandler = (event) => {
        setEnteredEducation(event.target.value);
    }

    const educationRemoveHandler = (id) => {
        setEducation(education.filter(education => id !== education.id));
    };

    const skillsInputChangeHandler = (event) => {
        setEnteredSkill(event.target.value);
    }

    const skillsRemoveHandler = (id) => {
        setSkills(skills.filter(skill => id !== skill.id));
    };

    const profilePictureUpdateHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('picture', profilePicture);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axios.post('/app/api/user/edit/picture', formData, config);

        props.history.push('/profiel');
    };

    const profileUpdateHandler = async (event) => {
        event.preventDefault();

        let tempCV;
        if(!externalCV.includes('https://')) {
            tempCV = 'https://' + externalCV;
        }
        else {
            tempCV = externalCV;
        }

        const profileData = {
            address: address,
            city: city,
            province: province,
            country: country,
            external_cv: tempCV,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const profileRes = await axios.put('/app/api/user/edit', profileData, config);

        props.history.push('/profiel');
    };

    const storeJobsHandler = async () => {

        const jobsData = {
            job: enteredJob,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const jobsRes = await axios.post('/app/api/jobs/store', jobsData, config);
    }

    const deleteJobsHandler = async (id) => {
        const jobToBeDeleted = jobs.find(job => id === job.id);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const jobsRes = await axios.delete('/app/api/destroy', jobToBeDeleted, config);
    }

    const storeEducationHandler = async () => {

        const educationData = {
            education: enteredEducation,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const educationRes = await axios.post('/app/api/education/store', educationData, config);
    }

    const storeSkillsHandler = async () => {

        const skillsData = {
            skill: enteredSkill,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const skillsRes = await axios.post('/app/api/skills/store', skillsData, config);
    }

    const jobsAddHandler = () => {
        if(enteredJob === '') {
            return;
        }

        setJobs(prevJobs => {
            return [
                ...prevJobs,
                {
                    job: enteredJob,
                }
            ];
        });
        storeJobsHandler();
        setEnteredJob('');
    };

    const educationAddHandler = () => {
        if(enteredEducation === '') {
            return;
        }

        setEducation(prevEducation => {
            return [
                ...prevEducation,
                {
                    education: enteredEducation,
                }
            ];
        });
        storeEducationHandler();
        setEnteredEducation('');
    };

    const skillsAddHandler = () => {
        if(enteredSkill === '') {
            return;
        }

        setSkills(prevSkills => {
            return [
                ...prevSkills,
                {
                    skill: enteredSkill,
                }
            ];
        });
        storeSkillsHandler();
        setEnteredSkill('');
    };

    let jobsList;
    if (jobs.length === 0) {
        jobsList = <p><i>Je hebt nog geen banen toegevoegd</i></p>
    }
    else {
        jobsList = jobs.map(job => (
            <p onClick={() => jobsRemoveHandler(job.id)} className="userprofile__form__skill" key={job.id}>{job.job}</p>
        ));
    }

    let skillsList;
    if (skills.length === 0) {
        skillsList = <p><i>Je hebt nog geen skills toegevoegd</i></p>
    }
    else {
        skillsList = skills.map(skill => (
            <p onClick={() => skillsRemoveHandler(skill.id)} className="userprofile__form__skill" key={skill.id}>{skill.skill}</p>
        ));
    }

    let educationList;
    if (education.length === 0) {
        educationList = <p><i>Je hebt nog geen opleidingen toegevoegd</i></p>
    }
    else {
        educationList = education.map(education => (
            <p onClick={() => educationRemoveHandler(education.id)} className="userprofile__form__skill" key={education.id}>{education.education}</p>
        ));
    }


    return(
        <section className ="userprofileedit">
            <form className="userprofileedit__form" onSubmit={profilePictureUpdateHandler} method="POST">
                <div className="userprofileedit__form__image">
                    <label htmlFor="profilePicture" className="userprofileedit__form__image__title">Afbeelding:</label>
                    <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        className="userprofileedit__form__image__file"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                    <button className="userprofileedit__form__image__button" type="submit">Upload</button>
                </div>
            </form>
            <form className="userprofileedit__form grid2" onSubmit={profileUpdateHandler} method="POST">
                
                <article className="userprofileedit__form__article item2">
                    
                        <div className="userprofileedit__form__article__container">
                            <h2>Algemene informatie</h2>    
                            <input
                                className="userprofileedit__form__article__container__input"
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={addressChangeHandler}
                                placeholder=" "
                            />
                            <label className="userprofileedit__form__article__container__placeholder" htmlFor="address">Adres</label>
                        </div>
                        <div className="userprofileedit__form__article__container">
                            <input
                                className="userprofileedit__form__article__container__input"
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={cityChangeHandler}
                                placeholder=" "
                            />
                            <label className="userprofileedit__form__article__container__placeholder" htmlFor="city">Plaats</label>
                        </div>
                        <div className="userprofileedit__form__article__container">
                            <input
                                className="userprofileedit__form__article__container__input"
                                type="text"
                                name="province"
                                id="province"
                                value={province}
                                onChange={provinceChangeHandler}
                                placeholder=" "
                            />
                            <label className="userprofileedit__form__article__container__placeholder" htmlFor="province">Provincie</label>
                        </div>
                        <div className="userprofileedit__form__article__container">
                            <input
                                className="userprofileedit__form__article__container__input"
                                type="text"
                                name="country"
                                id="country"
                                value={country}
                                onChange={countryChangeHandler}
                                placeholder=" "
                            />
                            <label className="userprofileedit__form__article__container__placeholder" htmlFor="country">Land</label>
                        </div>
                </article>

                <article className="userprofileedit__form__article item3">

                        <div className="userprofileedit__form__article__container">
                            <h2>Kennismaking video</h2>
                            <Link className="userprofileedit__form__article__container__link" to="/maak-kennismakingvideo">Kennismakingvideo opnemen</Link>
                        </div>
                        
                </article>

                <article className="userprofileedit__form__article item4">    
                    <div className="userprofileedit__form__article__container">
                    <h2>Eerdere banen</h2>
                    <div>{jobsList}</div>
                        <input
                            className="userprofileedit__form__article__container__input"
                            type="text"
                            id="job"
                            name="job"
                            value={enteredJob}
                            onChange={jobsInputChangeHandler}
                            placeholder=" "
                        />
                        <label className="userprofileedit__form__article__container__placeholder" htmlFor="job">Eerdere Banen Toevoegen</label>
                        <button
                        type="button"
                        className="userprofileedit__form__article__button--add"
                        onClick={jobsAddHandler}
                        ><img src={Add}></img></button>
                    </div>
                                

                    
                </article>

                <article className="userprofileedit__form__article item5">
                    
                    
                        <div className="userprofileedit__form__article__container">

                        <h2>Opleidingen</h2>
                        <div>{educationList}</div>
                        
                            <input
                                className="userprofileedit__form__article__container__input"
                                type="text"
                                id="education"
                                name="education"
                                value={enteredEducation}
                                onChange={educationInputChangeHandler}
                                placeholder=" "
                            />
                        <label className="userprofileedit__form__article__container__placeholder" htmlFor="education">Opleidingen toevoegen</label>
                        <button
                            type="button"
                            className="userprofileedit__form__article__button--add"
                            onClick={educationAddHandler}
                        ><img src={Add}></img></button>
                        </div>
                        
                        
                            
                        
                </article>

                <article className="userprofileedit__form__article item6">
                    
                    <div className="userprofileedit__form__article__container">
                    <h2>Skills</h2>
                    
                    <div>{skillsList}</div>
                        <input
                            className="userprofileedit__form__article__container__input"
                            type="text"
                            id="skill"
                            name="skill"
                            value={enteredSkill}
                            onChange={skillsInputChangeHandler}
                            placeholder=" "
                        />
                        <label className="userprofileedit__form__article__container__placeholder" htmlFor="skill">Skill Toevoegen</label>
                        <button
                        type="button"
                        className="userprofileedit__form__article__button--add"
                        onClick={skillsAddHandler}
                    ><img src={Add}></img></button>
                    </div>
                    
                </article>

                <article className="userprofileedit__form__article item7">
                    
                    <div className="userprofileedit__form__article__container">
                    <h2>Extern CV</h2>
                        <input
                            className="userprofileedit__form__article__container__input"
                            type="text"
                            name="externalCV"
                            id="externalCV"
                            value={externalCV}
                            onChange={(event) => setExternalCV(event.target.value)}
                            placeholder=" "
                        />
                        <label className="userprofileedit__form__article__container__placeholder" htmlFor="externalCV">Link</label>
                    </div> 
                </article>
                <button className="userprofileedit__form__article__button userprofileedit__form__article__button--save">Opslaan</button>
                    <button className="userprofileedit__form__article__button--cancel">
                        <Link className="userprofileedit__form__article__button--cancel__link" to="/profiel">Annuleren</Link>
                    </button>
            </form>
        </section>
    );
};

export default UserProfileEdit;
