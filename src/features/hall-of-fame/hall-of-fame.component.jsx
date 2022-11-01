export const HallOfFame = () => {
    let fameArr = basedHallOfFameData.map((ele) => ele);
    return (
        <>
            {fameArr.map((ele) => (
                <div>
                    {ele.id + 1}.{ele.name}:::Score:{ele.score}
                </div>
            ))}
        </>
    );
};

export const basedHallOfFameData = [
    { name: 'Tom1', score: 250, id: 0 },
    { name: 'Tom2', score: 1250, id: 1 },
    { name: 'Tom4', score: 500, id: 2 },
];
