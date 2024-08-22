export const Balance = ({
    amount,
    change,
    rate_of_change
}: {
    amount: any,
    change: any,
    rate_of_change: any
}) => {
    return <div className="w-full pt-12">
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1 className="font-bold text-6xl h-16">
                &#x24;{amount}
            </h1>
            <div className="text-2xl flex flex-row gap-6 dark:text-zinc-300/65 text-zinc-900/65">
                <p>&#43;&#x24;{change}</p>
                <p>{rate_of_change}&#x25;</p>
            </div>
        </div>
    </div>
}