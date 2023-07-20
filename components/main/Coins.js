import React, { useEffect } from 'react';
import Swiper from 'swiper';
import axios from 'axios';
import { useState } from 'react';
import { Chart } from '@/components/main/Chart';

import 'swiper/swiper-bundle.css'; // Import Swiper styles

function check(item) {
    return 'coins__slide-change coins__slide-change-plus';
}

const Coins = () => {
    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/'
                );
                setNames(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

        const swiper = new Swiper('.coins__slider', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    return (
        <section className="coins">
            <div className="coins__container">
                <div className="coins__slider-container">
                    <div className="coins__slider swiper">
                        {' '}
                        {/* Add "swiper" class here */}
                        <div className="swiper-wrapper">
                            {names.map((item) => (
                                <div
                                    className="coins__slide swiper-slide"
                                    key={item.name}
                                >
                                    <div className="coins__slide-coin">
                                        <img
                                            src={item.image}
                                            height="33px"
                                            width="33px"
                                            alt=""
                                        />
                                        {item.name}
                                    </div>

                                    <div className="coins__slide-price">
                                        {item.price}
                                    </div>
                                    <div
                                        className={
                                            item.increase > 0
                                                ? 'coins__slide-change coins__slide-change-plus'
                                                : 'coins__slide-change coins__slide-change'
                                        }
                                    >
                                        $
                                        {(
                                            item.price *
                                            item.increase *
                                            0.001
                                        ).toFixed(3)}{' '}
                                        ({item.increase}%)
                                    </div>
                                    <div className="coins__slide-graph">
                                        <Chart
                                            positive={
                                                item.increase < 0 ? false : true
                                            }
                                            w={251}
                                            h={79}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Coins;
