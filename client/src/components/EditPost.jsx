import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function EditPost({ user }) {
    const { ids } = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState({
        title: "",
        desc: "",
        image: null,
        imageFile: null,
    });
    const [previewImg, setPreviewImg] = useState(null);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/${ids}/`);
                setWork({
                    title: response.data.title,
                    desc: response.data.description,
                    image: response.data.images,
                    imageFile: null,
                });
                setPreviewImg(`http://127.0.0.1:8000${response.data.images}`);
                console.log(response.data)
            } catch (error) {
                console.error("Ошибка при получении работы", error);
            }
        };

        fetchWork();
    }, [ids]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWork({
            ...work,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setWork({
                ...work,
                image: imageUrl,
                imageFile: file,
            });
            setPreviewImg(imageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", work.title);
        formData.append("description", work.desc);
        if (work.imageFile) {
            formData.append("images", work.imageFile);
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/${ids}/`, formData, {
                withCredentials: true
            });
            console.log("Работа успешно обновлена", response.data);
            navigate('/profile');
        } catch (error) {
            console.error("Ошибка при обновлении", error);
        }
    };

    return (
        <div className="EditWork">
            <h1 className="EditWork__title">Редактирование поста</h1>
            <div className="EditWork__container">
                <form className="EditWork__form" onSubmit={handleSubmit}>
                    <div className="EditWork__img">
                        {previewImg && (
                            <>
                                <img src={previewImg} alt="Preview" className="EditWork__preview" />
                                <input type="file" className="EditWork__img1" onChange={handleFileChange} />
                            </>
                        )}
                    </div>
                    <input
                        className="EditWork__input"
                        name="title"
                        value={work.title}
                        onChange={handleChange}
                        placeholder="Заголовок"
                    />
                    <input
                        className="EditWork__input"
                        name="desc"
                        value={work.desc}
                        onChange={handleChange}
                        placeholder="описание"
                    />
                    <button type="submit" className="EditWork__btn">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;