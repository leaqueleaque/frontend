import React, {useEffect} from 'react';
import Swiper from 'swiper';
import axios from "axios";
import {useState} from "react";
import {Chart} from "@/components/main/Chart";

function check(item) {
    return 'coins__slide-change coins__slide-change-plus'
}

// export const getServerSideProps = async () => {
//     const repo = {test: 'hello'}
//     return {props: {repo}}
// }
const Coins = () => {
    const [names, setNames] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/')
                setNames(response.data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
        const swiper = new Swiper('.coins__slider', {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 11,

            navigation: {
                nextEl: '.coins__slider-next',
                prevEl: '.coins__slider-prev',
            },
            autoplay: {
                delay: 5000,
            },
        });

        // Обработчик события для кнопки "Next"
        const handleNextButtonClick = () => {
            swiper.slideNext();
        };

        // Обработчик события для кнопки "Prev"
        const handlePrevButtonClick = () => {
            swiper.slidePrev();
        };

        // Привязка обработчиков к кнопкам
        const nextButton = document.querySelector('.coins__slider-next');
        const prevButton = document.querySelector('.coins__slider-prev');
        nextButton.addEventListener('click', handleNextButtonClick);
        prevButton.addEventListener('click', handlePrevButtonClick);

        // Очистка обработчиков при размонтировании компонента
        return () => {
            nextButton.removeEventListener('click', handleNextButtonClick);
            prevButton.removeEventListener('click', handlePrevButtonClick);
        };
    }, []);
    return (
        <section className="coins">
            <div className="coins__container">
                <div className="coins__slider-container">
                    <div className="coins__slider swiper">
                        <div className="swiper-wrapper">
                            {names.map((item) => (
                                // const className = "coins__slide-change coins__slide-change-plus"
                                <div className="coins__slide swiper-slide">
                                    <div className="coins__slide-coin">
                                        <img src={item.image} height="33px" width="33px" alt=""/>
                                        {item.name}
                                    </div>

                                    <div className="coins__slide-price">{item.price}</div>
                                    <div
                                        className={item.increase > 0 ? "coins__slide-change coins__slide-change-plus" : "coins__slide-change coins__slide-change"}>${(item.price * item.increase * 0.001).toFixed(3)} ({item.increase}%)
                                    </div>
                                    {/*<div className="coins__slide-change coins__slide-change-plus">${(item.price*item.increase*0.001).toFixed(3)} ({item.increase}%)</div>*/}
                                    {/*<div className="coins__slide-change coins__slide-change-plus">$42.52 (2.26%)</div>*/}
                                    <div className="coins__slide-graph">
                                        <Chart positive={item.increase < 0 ? false : true} w={251} h={79}/>
                                    </div>
                                    {/* <div className="coins__slide-date">May 29, 2023, 7:33 pm</div> */}
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="coins__slider-prev"></div>
                    <div className="coins__slider-next"></div>
                </div>
            </div>
        </section>
    );
};

export default Coins;
