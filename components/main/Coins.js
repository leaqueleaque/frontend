import React, {useEffect} from 'react';
import Swiper from 'swiper';
import axios from "axios";
import {useState} from "react";

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
                                        <svg
                                            width="251"
                                            height="79"
                                            viewBox="0 0 251 79"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M249.1 43.71L247.1 44.7082C244.667 45.6213 239.965 47.2103 235.1 50.6972C230.235 54.1841 224.965 59.4699 220.1 63.6734C215.235 67.8769 210.965 71.0176 206.1 65.6697C201.235 60.3219 195.965 46.3329 191.1 47.7027C186.235 49.0725 181.965 65.3135 177.1 72.6569C172.235 80.0004 166.965 77.9707 162.1 75.6514C157.235 73.3322 151.965 70.8788 147.1 63.6734C142.235 56.468 137.965 45.4382 133.1 40.7155C128.235 35.9928 122.965 37.8706 118.1 33.7283C113.235 29.586 108.965 18.8594 104.1 14.7631C99.2347 10.6668 93.965 12.7967 89.0999 18.7558C84.2347 24.7148 78.965 35.047 74.0999 34.7265C69.2347 34.4059 64.965 23.5297 60.0999 22.7484C55.2347 21.9672 49.965 30.5241 45.0999 38.7192C40.2347 46.9142 35.965 55.4735 31.0999 49.699C26.2347 43.9245 20.965 24.0271 16.0999 13.7649C11.2347 3.50271 6.53243 2.36435 4.09985 1.78687L1.09985 1.78687"
                                                stroke="#31AC7C"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                            />
                                        </svg>
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
