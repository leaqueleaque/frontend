import { useEffect, useState, useCallback } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Toy from '@/components/auth/TOOL';

const Seting = () => {
    const [profile, setProfile] = useState(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [present_address, setPresentAddress] = useState('');
    const [permanent_address, setPermanentAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [photo, setPhoto] = useState();

    const [showToast, setShowToast] = useState(false);
    const [toyMessage, setToyMessage] = useState('');
    const [positiveToast, setPositiveToast] = useState(false);

    const [isFirst, setIsFirst] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const { user } = response.data;

                if (!isFirst) {
                    console.log(isFirst);
                    setCity(user.city);
                    setCountry(user.country);
                    setFullname(user.full_name);
                    setPhoneNumber(user.mobile);
                    setPermanentAddress(user.permanent_address);
                    setPresentAddress(user.present_address);
                    setPostalCode(user.postal_code);
                    setUserName(user.username);
                    setDateOfBirth(user.birthday);
                    setIsFirst(true);
                }

                setProfile(user);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = async (e, type = '1') => {
        e.preventDefault();
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const formData = new FormData();
                formData.append('full_name', fullname);
                formData.append('mobile', phoneNumber);
                formData.append('present_address', present_address);
                formData.append('permanent_address', permanent_address);
                formData.append('country', country);
                formData.append('city', city);
                formData.append('postal_code', postalCode);
                formData.append('old_password', oldPassword);
                formData.append('new_password', newPassword);
                formData.append('username', userName);
                formData.append('birthday', date_of_birth);
                formData.append('avatar', photo);

                const response = await axios.post(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/settings/',
                    // {
                    // 	full_name: fullname,
                    // 	mobile: phoneNumber,
                    // 	present_address,
                    // 	permanent_address,
                    // 	country,
                    // 	city,
                    // 	postal_code: postalCode,
                    // 	old_password: oldPassword,
                    // 	new_password: newPassword,
                    // 	username: userName,
                    // 	birthday: date_of_birth,
                    // },
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setPositiveToast(true);
                    setToyMessage('You have successfully saved your profile');
                    fetchData();
                } else {
                    setPositiveToast(false);
                    setToyMessage('Something went wrong');
                }

                setShowToast(true);
            }
        } catch (error) {
            console.log(error);
            setPositiveToast(false);
            setToyMessage('Something went wrong');
            setShowToast(true);
        }
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let timeout;

        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [showToast]);

    return (
        <div className="b1">
            <Toy
                visible={showToast}
                message={toyMessage}
                positive={positiveToast}
            />

            <div className="page-title dashboard">
                <div className="container">
                    <div className="row"></div>
                </div>
            </div>

            <div className="content-body">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card sub-menu"></div>
                        </div>
                        <div className="col-xl-12">
                            <div className="row">
                                {!profile?.is_verified && (
                                    <div className="col-xl-12 col-md-12">
                                        <div
                                            className="card"
                                            style={{
                                                minHeight: '170px',
                                                background: '#26273a',
                                            }}
                                        >
                                            <div
                                                className="card-header"
                                                style={{
                                                    background: '#26273a',
                                                }}
                                            >
                                                <h4
                                                    className="card-title"
                                                    style={{ color: '#ffffff' }}
                                                >
                                                    Account Verification
                                                </h4>
                                            </div>
                                            <div
                                                className="card-body"
                                                style={{
                                                    background: '#26273a',
                                                }}
                                            >
                                                <div className="form-row">
                                                    <div className="col-md-10">
                                                        <p
                                                            style={{
                                                                color: '#9895d9',
                                                            }}
                                                        >
                                                            To increase user
                                                            limits, you need to
                                                            pass the
                                                            verification of a
                                                            Intermediate user or
                                                            a advanced user, you
                                                            must provide
                                                            personal
                                                            information, a photo
                                                            of an identity
                                                            document, and a
                                                            photo of your face.
                                                        </p>
                                                    </div>

                                                    <div className="col-12">
                                                        <br />
                                                        <a
                                                            href="verification"
                                                            className="btn btn-info waves-effect px-4"
                                                        >
                                                            Verification page
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="col-xl-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <form
                                                onSubmit={(e) =>
                                                    handleSubmit(e, '1')
                                                }
                                                enctype="multipart/form-data"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="action"
                                                    value="UPDATE_AVATAR_AND_LOGIN"
                                                />
                                                <div className="form-row">
                                                    <div className="form-group col-xl-12">
                                                        <label className="mr-sm-2">
                                                            Your Username
                                                        </label>
                                                        <input
                                                            name="username"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            value={userName}
                                                            onChange={(e) =>
                                                                setUserName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="form-group col-xl-12">
                                                        <div className="media align-items-center mb-3">
                                                            <img
                                                                className="mr-3 rounded-circle mr-0 mr-sm-3"
                                                                src={`${
                                                                    profile?.avatar
                                                                        ? 'https://leaque.com' +
                                                                          profile?.avatar
                                                                        : '/img/avatar.svg'
                                                                }`}
                                                                width="50"
                                                                height="50"
                                                                alt=""
                                                            />
                                                            <div className="media-body">
                                                                <h5
                                                                    className="mb-0"
                                                                    style={{
                                                                        color: '#ffffff',
                                                                    }}
                                                                >
                                                                    {
                                                                        profile?.username
                                                                    }
                                                                </h5>
                                                                <p
                                                                    className="mb-0"
                                                                    style={{
                                                                        color: '#a1a0a7',
                                                                    }}
                                                                >
                                                                    Max file
                                                                    size is 1 mb
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="file-upload-wrapper"
                                                            data-text={`${
                                                                photo
                                                                    ? photo
                                                                    : 'Change Photo'
                                                            }`}
                                                        >
                                                            <input
                                                                id="profile_photo"
                                                                accept="image/x-png,image/jpeg"
                                                                name="profile_photo"
                                                                type="file"
                                                                className="file-upload-field"
                                                                onChange={(e) =>
                                                                    setPhoto(
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <br />
                                                        <button
                                                            id="save_img_login"
                                                            className="btn btn-success waves-effect px-4"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <form
                                                onSubmit={(e) =>
                                                    handleSubmit(e, '2')
                                                }
                                            >
                                                <div className="form-row">
                                                    <div className="form-group col-xl-12">
                                                        <label className="mr-sm-2">
                                                            Phone number
                                                        </label>
                                                        <input
                                                            id="phone_number"
                                                            type="phone"
                                                            className="form-control"
                                                            placeholder="+1 1234567890"
                                                            value={phoneNumber}
                                                            onChange={(e) =>
                                                                setPhoneNumber(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="form-group col-xl-12">
                                                        <label className="mr-sm-2">
                                                            Old Password
                                                        </label>
                                                        <input
                                                            id="old_password"
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="**********"
                                                            value={oldPassword}
                                                            onChange={(e) =>
                                                                setOldPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-12">
                                                        <label className="mr-sm-2">
                                                            New Password
                                                        </label>
                                                        <input
                                                            id="new_password"
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="**********"
                                                            value={newPassword}
                                                            onChange={(e) =>
                                                                setNewPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <br />
                                                        <button
                                                            id="user_profile_save"
                                                            className="btn btn-success waves-effect px-4"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4
                                                className="card-title"
                                                style={{ color: '#ffffff' }}
                                            >
                                                Personal Information
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <form
                                                className="personal_validate"
                                                onSubmit={(e) =>
                                                    handleSubmit(e, '3')
                                                }
                                            >
                                                <div className="form-row">
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Your Name
                                                        </label>
                                                        <input
                                                            id="fullname"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="John Doe"
                                                            name="fullname"
                                                            value={fullname}
                                                            onChange={(e) =>
                                                                setFullname(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Current email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control_blocked"
                                                            placeholder={
                                                                profile
                                                                    ? profile.email
                                                                    : 'email'
                                                            }
                                                            name="email"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Date of birth
                                                        </label>
                                                        <input
                                                            id="date_of_birth"
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="10-10-2020"
                                                            autoComplete="on"
                                                            name="dob"
                                                            min="1900-01-01"
                                                            max="2099-12-31"
                                                            value={
                                                                date_of_birth
                                                            }
                                                            onChange={(e) =>
                                                                setDateOfBirth(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Present Address
                                                        </label>
                                                        <input
                                                            id="present_address"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="56, Old Street, Brooklyn"
                                                            name="present_address"
                                                            value={
                                                                present_address
                                                            }
                                                            onChange={(e) =>
                                                                setPresentAddress(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Permanent Address
                                                        </label>
                                                        <input
                                                            id="permanent_address"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="123, Central Square, Brooklyn"
                                                            name="permanentaddress"
                                                            value={
                                                                permanent_address
                                                            }
                                                            onChange={(e) =>
                                                                setPermanentAddress(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            City
                                                        </label>
                                                        <input
                                                            id="user_city"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="New York"
                                                            name="city"
                                                            value={city}
                                                            onChange={(e) =>
                                                                setCity(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Postal Code
                                                        </label>
                                                        <input
                                                            id="user_postal_code"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="25481"
                                                            name="postal"
                                                            value={postalCode}
                                                            onChange={(e) =>
                                                                setPostalCode(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6 col-md-6">
                                                        <label className="mr-sm-2">
                                                            Country
                                                        </label>
                                                        <select
                                                            id="user_country"
                                                            className="form-control"
                                                            name="country"
                                                            value={country}
                                                            onChange={(e) =>
                                                                setCountry(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                Select
                                                            </option>
                                                            <option value="Afghanistan">
                                                                Afghanistan
                                                            </option>
                                                            <option value="Åland Islands">
                                                                Aland Islands
                                                            </option>
                                                            <option value="Albania">
                                                                Albania
                                                            </option>
                                                            <option value="Algeria">
                                                                Algeria
                                                            </option>
                                                            <option value="American Samoa">
                                                                American Samoa
                                                            </option>
                                                            <option value="Andorra">
                                                                Andorra
                                                            </option>
                                                            <option value="Angola">
                                                                Angola
                                                            </option>
                                                            <option value="Anguilla">
                                                                Anguilla
                                                            </option>
                                                            <option value="Antarctica">
                                                                Antarctica
                                                            </option>
                                                            <option value="Antigua and Barbuda">
                                                                Antigua and
                                                                Barbuda
                                                            </option>
                                                            <option value="Argentina">
                                                                Argentina
                                                            </option>
                                                            <option value="Armenia">
                                                                Armenia
                                                            </option>
                                                            <option value="Aruba">
                                                                Aruba
                                                            </option>
                                                            <option value="Australia">
                                                                Australia
                                                            </option>
                                                            <option value="Austria">
                                                                Austria
                                                            </option>
                                                            <option value="Azerbaijan">
                                                                Azerbaijan
                                                            </option>
                                                            <option value="Bahamas">
                                                                Bahamas
                                                            </option>
                                                            <option value="Bahrain">
                                                                Bahrain
                                                            </option>
                                                            <option value="Bangladesh">
                                                                Bangladesh
                                                            </option>
                                                            <option value="Barbados">
                                                                Barbados
                                                            </option>
                                                            <option value="Belarus">
                                                                Belarus
                                                            </option>
                                                            <option value="Belgium">
                                                                Belgium
                                                            </option>
                                                            <option value="Belize">
                                                                Belize
                                                            </option>
                                                            <option value="Benin">
                                                                Benin
                                                            </option>
                                                            <option value="Bermuda">
                                                                Bermuda
                                                            </option>
                                                            <option value="Bhutan">
                                                                Bhutan
                                                            </option>
                                                            <option value="Bolivia">
                                                                Bolivia
                                                            </option>
                                                            <option value="Bosnia and Herzegovina">
                                                                Bosnia and
                                                                Herzegovina
                                                            </option>
                                                            <option value="Botswana">
                                                                Botswana
                                                            </option>
                                                            <option value="Bouvet Island">
                                                                Bouvet Island
                                                            </option>
                                                            <option value="Brazil">
                                                                Brazil
                                                            </option>
                                                            <option value="British Indian Ocean Territory">
                                                                British Indian
                                                                Ocean Territory
                                                            </option>
                                                            <option value="Brunei Darussalam">
                                                                Brunei
                                                                Darussalam
                                                            </option>
                                                            <option value="Bulgaria">
                                                                Bulgaria
                                                            </option>
                                                            <option value="Burkina Faso">
                                                                Burkina Faso
                                                            </option>
                                                            <option value="Burundi">
                                                                Burundi
                                                            </option>
                                                            <option value="Cambodia">
                                                                Cambodia
                                                            </option>
                                                            <option value="Cameroon">
                                                                Cameroon
                                                            </option>
                                                            <option value="Canada">
                                                                Canada
                                                            </option>
                                                            <option value="Cape Verde">
                                                                Cape Verde
                                                            </option>
                                                            <option value="Cayman Islands">
                                                                Cayman Islands
                                                            </option>
                                                            <option value="Central African Republic">
                                                                Central African
                                                                Republic
                                                            </option>
                                                            <option value="Chad">
                                                                Chad
                                                            </option>
                                                            <option value="Chile">
                                                                Chile
                                                            </option>
                                                            <option value="China">
                                                                China
                                                            </option>
                                                            <option value="Christmas Island">
                                                                Christmas Island
                                                            </option>
                                                            <option value="Cocos (Keeling) Islands">
                                                                Cocos (Keeling)
                                                                Islands
                                                            </option>
                                                            <option value="Colombia">
                                                                Colombia
                                                            </option>
                                                            <option value="Comoros">
                                                                Comoros
                                                            </option>
                                                            <option value="Congo">
                                                                Congo
                                                            </option>
                                                            <option value="Congo, The Democratic Republic of The">
                                                                Congo, The
                                                                Democratic
                                                                Republic of The
                                                            </option>
                                                            <option value="Cook Islands">
                                                                Cook Islands
                                                            </option>
                                                            <option value="Costa Rica">
                                                                Costa Rica
                                                            </option>
                                                            <option value="Cote D'ivoire">
                                                                Cote D'ivoire
                                                            </option>
                                                            <option value="Croatia">
                                                                Croatia
                                                            </option>
                                                            <option value="Cuba">
                                                                Cuba
                                                            </option>
                                                            <option value="Cyprus">
                                                                Cyprus
                                                            </option>
                                                            <option value="Czech Republic">
                                                                Czech Republic
                                                            </option>
                                                            <option value="Denmark">
                                                                Denmark
                                                            </option>
                                                            <option value="Djibouti">
                                                                Djibouti
                                                            </option>
                                                            <option value="Dominica">
                                                                Dominica
                                                            </option>
                                                            <option value="Dominican Republic">
                                                                Dominican
                                                                Republic
                                                            </option>
                                                            <option value="Ecuador">
                                                                Ecuador
                                                            </option>
                                                            <option value="Egypt">
                                                                Egypt
                                                            </option>
                                                            <option value="El Salvador">
                                                                El Salvador
                                                            </option>
                                                            <option value="Equatorial Guinea">
                                                                Equatorial
                                                                Guinea
                                                            </option>
                                                            <option value="Eritrea">
                                                                Eritrea
                                                            </option>
                                                            <option value="Estonia">
                                                                Estonia
                                                            </option>
                                                            <option value="Ethiopia">
                                                                Ethiopia
                                                            </option>
                                                            <option value="Falkland Islands (Malvinas)">
                                                                Falkland Islands
                                                                (Malvinas)
                                                            </option>
                                                            <option value="Faroe Islands">
                                                                Faroe Islands
                                                            </option>
                                                            <option value="Fiji">
                                                                Fiji
                                                            </option>
                                                            <option value="Finland">
                                                                Finland
                                                            </option>
                                                            <option value="France">
                                                                France
                                                            </option>
                                                            <option value="French Guiana">
                                                                French Guiana
                                                            </option>
                                                            <option value="French Polynesia">
                                                                French Polynesia
                                                            </option>
                                                            <option value="French Southern Territories">
                                                                French Southern
                                                                Territories
                                                            </option>
                                                            <option value="Gabon">
                                                                Gabon
                                                            </option>
                                                            <option value="Gambia">
                                                                Gambia
                                                            </option>
                                                            <option value="Georgia">
                                                                Georgia
                                                            </option>
                                                            <option value="Germany">
                                                                Germany
                                                            </option>
                                                            <option value="Ghana">
                                                                Ghana
                                                            </option>
                                                            <option value="Gibraltar">
                                                                Gibraltar
                                                            </option>
                                                            <option value="Greece">
                                                                Greece
                                                            </option>
                                                            <option value="Greenland">
                                                                Greenland
                                                            </option>
                                                            <option value="Grenada">
                                                                Grenada
                                                            </option>
                                                            <option value="Guadeloupe">
                                                                Guadeloupe
                                                            </option>
                                                            <option value="Guam">
                                                                Guam
                                                            </option>
                                                            <option value="Guatemala">
                                                                Guatemala
                                                            </option>
                                                            <option value="Guernsey">
                                                                Guernsey
                                                            </option>
                                                            <option value="Guinea">
                                                                Guinea
                                                            </option>
                                                            <option value="Guinea-bissau">
                                                                Guinea-bissau
                                                            </option>
                                                            <option value="Guyana">
                                                                Guyana
                                                            </option>
                                                            <option value="Haiti">
                                                                Haiti
                                                            </option>
                                                            <option value="Heard Island and Mcdonald Islands">
                                                                Heard Island and
                                                                Mcdonald Islands
                                                            </option>
                                                            <option value="Holy See (Vatican City State)">
                                                                Holy See
                                                                (Vatican City
                                                                State)
                                                            </option>
                                                            <option value="Honduras">
                                                                Honduras
                                                            </option>
                                                            <option value="Hong Kong">
                                                                Hong Kong
                                                            </option>
                                                            <option value="Hungary">
                                                                Hungary
                                                            </option>
                                                            <option value="Iceland">
                                                                Iceland
                                                            </option>
                                                            <option value="India">
                                                                India
                                                            </option>
                                                            <option value="Indonesia">
                                                                Indonesia
                                                            </option>
                                                            <option value="Iran, Islamic Republic of">
                                                                Iran, Islamic
                                                                Republic of
                                                            </option>
                                                            <option value="Iraq">
                                                                Iraq
                                                            </option>
                                                            <option value="Ireland">
                                                                Ireland
                                                            </option>
                                                            <option value="Isle of Man">
                                                                Isle of Man
                                                            </option>
                                                            <option value="Israel">
                                                                Israel
                                                            </option>
                                                            <option value="Italy">
                                                                Italy
                                                            </option>
                                                            <option value="Jamaica">
                                                                Jamaica
                                                            </option>
                                                            <option value="Japan">
                                                                Japan
                                                            </option>
                                                            <option value="Jersey">
                                                                Jersey
                                                            </option>
                                                            <option value="Jordan">
                                                                Jordan
                                                            </option>
                                                            <option value="Kazakhstan">
                                                                Kazakhstan
                                                            </option>
                                                            <option value="Kenya">
                                                                Kenya
                                                            </option>
                                                            <option value="Kiribati">
                                                                Kiribati
                                                            </option>
                                                            <option value="Korea, Democratic People's Republic of">
                                                                Korea,
                                                                Democratic
                                                                People's
                                                                Republic of
                                                            </option>
                                                            <option value="Korea, Republic of">
                                                                Korea, Republic
                                                                of
                                                            </option>
                                                            <option value="Kuwait">
                                                                Kuwait
                                                            </option>
                                                            <option value="Kyrgyzstan">
                                                                Kyrgyzstan
                                                            </option>
                                                            <option value="Lao People's Democratic Republic">
                                                                Lao People's
                                                                Democratic
                                                                Republic
                                                            </option>
                                                            <option value="Latvia">
                                                                Latvia
                                                            </option>
                                                            <option value="Lebanon">
                                                                Lebanon
                                                            </option>
                                                            <option value="Lesotho">
                                                                Lesotho
                                                            </option>
                                                            <option value="Liberia">
                                                                Liberia
                                                            </option>
                                                            <option value="Libyan Arab Jamahiriya">
                                                                Libyan Arab
                                                                Jamahiriya
                                                            </option>
                                                            <option value="Liechtenstein">
                                                                Liechtenstein
                                                            </option>
                                                            <option value="Lithuania">
                                                                Lithuania
                                                            </option>
                                                            <option value="Luxembourg">
                                                                Luxembourg
                                                            </option>
                                                            <option value="Macao">
                                                                Macao
                                                            </option>
                                                            <option value="Macedonia, The Former Yugoslav Republic of">
                                                                Macedonia, The
                                                                Former Yugoslav
                                                                Republic of
                                                            </option>
                                                            <option value="Madagascar">
                                                                Madagascar
                                                            </option>
                                                            <option value="Malawi">
                                                                Malawi
                                                            </option>
                                                            <option value="Malaysia">
                                                                Malaysia
                                                            </option>
                                                            <option value="Maldives">
                                                                Maldives
                                                            </option>
                                                            <option value="Mali">
                                                                Mali
                                                            </option>
                                                            <option value="Malta">
                                                                Malta
                                                            </option>
                                                            <option value="Marshall Islands">
                                                                Marshall Islands
                                                            </option>
                                                            <option value="Martinique">
                                                                Martinique
                                                            </option>
                                                            <option value="Mauritania">
                                                                Mauritania
                                                            </option>
                                                            <option value="Mauritius">
                                                                Mauritius
                                                            </option>
                                                            <option value="Mayotte">
                                                                Mayotte
                                                            </option>
                                                            <option value="Mexico">
                                                                Mexico
                                                            </option>
                                                            <option value="Micronesia, Federated States of">
                                                                Micronesia,
                                                                Federated States
                                                                of
                                                            </option>
                                                            <option value="Moldova, Republic of">
                                                                Moldova,
                                                                Republic of
                                                            </option>
                                                            <option value="Monaco">
                                                                Monaco
                                                            </option>
                                                            <option value="Mongolia">
                                                                Mongolia
                                                            </option>
                                                            <option value="Montenegro">
                                                                Montenegro
                                                            </option>
                                                            <option value="Montserrat">
                                                                Montserrat
                                                            </option>
                                                            <option value="Morocco">
                                                                Morocco
                                                            </option>
                                                            <option value="Mozambique">
                                                                Mozambique
                                                            </option>
                                                            <option value="Myanmar">
                                                                Myanmar
                                                            </option>
                                                            <option value="Namibia">
                                                                Namibia
                                                            </option>
                                                            <option value="Nauru">
                                                                Nauru
                                                            </option>
                                                            <option value="Nepal">
                                                                Nepal
                                                            </option>
                                                            <option value="Netherlands">
                                                                Netherlands
                                                            </option>
                                                            <option value="Netherlands Antilles">
                                                                Netherlands
                                                                Antilles
                                                            </option>
                                                            <option value="New Caledonia">
                                                                New Caledonia
                                                            </option>
                                                            <option value="New Zealand">
                                                                New Zealand
                                                            </option>
                                                            <option value="Nicaragua">
                                                                Nicaragua
                                                            </option>
                                                            <option value="Niger">
                                                                Niger
                                                            </option>
                                                            <option value="Nigeria">
                                                                Nigeria
                                                            </option>
                                                            <option value="Niue">
                                                                Niue
                                                            </option>
                                                            <option value="Norfolk Island">
                                                                Norfolk Island
                                                            </option>
                                                            <option value="Northern Mariana Islands">
                                                                Northern Mariana
                                                                Islands
                                                            </option>
                                                            <option value="Norway">
                                                                Norway
                                                            </option>
                                                            <option value="Oman">
                                                                Oman
                                                            </option>
                                                            <option value="Pakistan">
                                                                Pakistan
                                                            </option>
                                                            <option value="Palau">
                                                                Palau
                                                            </option>
                                                            <option value="Palestinian Territory, Occupied">
                                                                Palestinian
                                                                Territory,
                                                                Occupied
                                                            </option>
                                                            <option value="Panama">
                                                                Panama
                                                            </option>
                                                            <option value="Papua New Guinea">
                                                                Papua New Guinea
                                                            </option>
                                                            <option value="Paraguay">
                                                                Paraguay
                                                            </option>
                                                            <option value="Peru">
                                                                Peru
                                                            </option>
                                                            <option value="Philippines">
                                                                Philippines
                                                            </option>
                                                            <option value="Pitcairn">
                                                                Pitcairn
                                                            </option>
                                                            <option value="Poland">
                                                                Poland
                                                            </option>
                                                            <option value="Portugal">
                                                                Portugal
                                                            </option>
                                                            <option value="Puerto Rico">
                                                                Puerto Rico
                                                            </option>
                                                            <option value="Qatar">
                                                                Qatar
                                                            </option>
                                                            <option value="Reunion">
                                                                Reunion
                                                            </option>
                                                            <option value="Romania">
                                                                Romania
                                                            </option>
                                                            <option value="Russian Federation">
                                                                Russian
                                                                Federation
                                                            </option>
                                                            <option value="Rwanda">
                                                                Rwanda
                                                            </option>
                                                            <option value="Saint Helena">
                                                                Saint Helena
                                                            </option>
                                                            <option value="Saint Kitts and Nevis">
                                                                Saint Kitts and
                                                                Nevis
                                                            </option>
                                                            <option value="Saint Lucia">
                                                                Saint Lucia
                                                            </option>
                                                            <option value="Saint Pierre and Miquelon">
                                                                Saint Pierre and
                                                                Miquelon
                                                            </option>
                                                            <option value="Saint Vincent and The Grenadines">
                                                                Saint Vincent
                                                                and The
                                                                Grenadines
                                                            </option>
                                                            <option value="Samoa">
                                                                Samoa
                                                            </option>
                                                            <option value="San Marino">
                                                                San Marino
                                                            </option>
                                                            <option value="Sao Tome and Principe">
                                                                Sao Tome and
                                                                Principe
                                                            </option>
                                                            <option value="Saudi Arabia">
                                                                Saudi Arabia
                                                            </option>
                                                            <option value="Senegal">
                                                                Senegal
                                                            </option>
                                                            <option value="Serbia">
                                                                Serbia
                                                            </option>
                                                            <option value="Seychelles">
                                                                Seychelles
                                                            </option>
                                                            <option value="Sierra Leone">
                                                                Sierra Leone
                                                            </option>
                                                            <option value="Singapore">
                                                                Singapore
                                                            </option>
                                                            <option value="Slovakia">
                                                                Slovakia
                                                            </option>
                                                            <option value="Slovenia">
                                                                Slovenia
                                                            </option>
                                                            <option value="Solomon Islands">
                                                                Solomon Islands
                                                            </option>
                                                            <option value="Somalia">
                                                                Somalia
                                                            </option>
                                                            <option value="South Africa">
                                                                South Africa
                                                            </option>
                                                            <option value="South Georgia and The South Sandwich Islands">
                                                                South Georgia
                                                                and The South
                                                                Sandwich Islands
                                                            </option>
                                                            <option value="Spain">
                                                                Spain
                                                            </option>
                                                            <option value="Sri Lanka">
                                                                Sri Lanka
                                                            </option>
                                                            <option value="Sudan">
                                                                Sudan
                                                            </option>
                                                            <option value="Suriname">
                                                                Suriname
                                                            </option>
                                                            <option value="Svalbard and Jan Mayen">
                                                                Svalbard and Jan
                                                                Mayen
                                                            </option>
                                                            <option value="Swaziland">
                                                                Swaziland
                                                            </option>
                                                            <option value="Sweden">
                                                                Sweden
                                                            </option>
                                                            <option value="Switzerland">
                                                                Switzerland
                                                            </option>
                                                            <option value="Syrian Arab Republic">
                                                                Syrian Arab
                                                                Republic
                                                            </option>
                                                            <option value="Taiwan, Province of China">
                                                                Taiwan, Province
                                                                of China
                                                            </option>
                                                            <option value="Tajikistan">
                                                                Tajikistan
                                                            </option>
                                                            <option value="Tanzania, United Republic of">
                                                                Tanzania, United
                                                                Republic of
                                                            </option>
                                                            <option value="Thailand">
                                                                Thailand
                                                            </option>
                                                            <option value="Timor-leste">
                                                                Timor-leste
                                                            </option>
                                                            <option value="Togo">
                                                                Togo
                                                            </option>
                                                            <option value="Tokelau">
                                                                Tokelau
                                                            </option>
                                                            <option value="Tonga">
                                                                Tonga
                                                            </option>
                                                            <option value="Trinidad and Tobago">
                                                                Trinidad and
                                                                Tobago
                                                            </option>
                                                            <option value="Tunisia">
                                                                Tunisia
                                                            </option>
                                                            <option value="Turkey">
                                                                Turkey
                                                            </option>
                                                            <option value="Turkmenistan">
                                                                Turkmenistan
                                                            </option>
                                                            <option value="Turks and Caicos Islands">
                                                                Turks and Caicos
                                                                Islands
                                                            </option>
                                                            <option value="Tuvalu">
                                                                Tuvalu
                                                            </option>
                                                            <option value="Uganda">
                                                                Uganda
                                                            </option>
                                                            <option value="Ukraine">
                                                                Ukraine
                                                            </option>
                                                            <option value="United Arab Emirates">
                                                                United Arab
                                                                Emirates
                                                            </option>
                                                            <option value="United Kingdom">
                                                                United Kingdom
                                                            </option>
                                                            <option value="United States">
                                                                United States
                                                            </option>
                                                            <option value="United States Minor Outlying Islands">
                                                                United States
                                                                Minor Outlying
                                                                Islands
                                                            </option>
                                                            <option value="Uruguay">
                                                                Uruguay
                                                            </option>
                                                            <option value="Uzbekistan">
                                                                Uzbekistan
                                                            </option>
                                                            <option value="Vanuatu">
                                                                Vanuatu
                                                            </option>
                                                            <option value="Venezuela">
                                                                Venezuela
                                                            </option>
                                                            <option value="Viet Nam">
                                                                Viet Nam
                                                            </option>
                                                            <option value="Virgin Islands, British">
                                                                Virgin Islands,
                                                                British
                                                            </option>
                                                            <option value="Virgin Islands, U.S.">
                                                                Virgin Islands,
                                                                U.S.
                                                            </option>
                                                            <option value="Wallis and Futuna">
                                                                Wallis and
                                                                Futuna
                                                            </option>
                                                            <option value="Western Sahara">
                                                                Western Sahara
                                                            </option>
                                                            <option value="Yemen">
                                                                Yemen
                                                            </option>
                                                            <option value="Zambia">
                                                                Zambia
                                                            </option>
                                                            <option value="Zimbabwe">
                                                                Zimbabweoption
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-12">
                                                        <br />
                                                        <button
                                                            id="update_person_info"
                                                            className="btn btn-success px-4"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Seting;
