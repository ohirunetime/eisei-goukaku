import React, { useEffect, useState } from 'react'
import { useSubjectCoverage } from '@/hooks/useSubjectCoverage';
import { useAuthContext } from '@/contexts/AuthContext';
import type { SubjectCoverage } from '@/types/chart'
import type { User } from '@/types/auth'
import * as styles from "@/styles/components/SubjectCoverageGraph.module.scss";

const getPercentColorMod = (percent: number) => {
    if (percent >= 80) return styles.subjectCoverage__percentGreen;
    if (percent >= 60) return styles.subjectCoverage__percentTeal;
    if (percent >= 50) return styles.subjectCoverage__percentOrange;
    return styles.subjectCoverage__percentRed;
};
const getBarColorMod = (percent: number) => {
    if (percent >= 80) return styles.subjectCoverage__barFillGreen;
    if (percent >= 60) return styles.subjectCoverage__barFillTeal;
    if (percent >= 50) return styles.subjectCoverage__barFillOrange;
    return styles.subjectCoverage__barFillRed;
};

// 年月のラベルを生成
const getYearMonthLabel = (year: number, month: number) => {
    return `${year}年${month}月度`;
};

const SubjectCoverageGraph: React.FC = () => {
    const { user, loading: authLoading } = useAuthContext();
    const { fetchSubjectCoverage } = useSubjectCoverage();
    const [subjectCoverage, setSubjectCoverage] = useState<SubjectCoverage[]>([]);

    useEffect(() => {
        if (authLoading || !user) return;
        const load = async () => {
            const data = await fetchSubjectCoverage(user as User);
            setSubjectCoverage(data);
        };
        load();
    }, [user, authLoading]);

    // year+monthでグループ化
    const grouped = subjectCoverage.reduce((acc, cur) => {
        const key = `${cur.year}-${cur.month}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(cur);
        return acc;
    }, {} as Record<string, SubjectCoverage[]>);

    // 年月の降順で表示
    const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    return (
        <div className={styles.subjectCoverage}>
            {sortedKeys.map((key) => {
                const [year, month] = key.split('-').map(Number);
                return (
                    <div key={key} className={styles.subjectCoverage__group}>
                        <div className={styles.subjectCoverage__groupTitle}>
                            {getYearMonthLabel(year, month)}
                        </div>
                        <div className={styles.subjectCoverage__list}>
                            {grouped[key].map((subject) => {
                                const percent = subject.totalQuestionCount === 0
                                    ? 0
                                    : Math.round(subject.answeredQuestionCount / subject.totalQuestionCount * 100);
                                return (
                                    <div key={subject.subjectId} className={styles.subjectCoverage__item}>
                                        <div className={styles.subjectCoverage__title}>{subject.subjectName}</div>
                                        <div className={`${styles.subjectCoverage__percent} ${getPercentColorMod(percent)}`}>
                                            {percent}%
                                            <span className={styles.subjectCoverage__countText}>
                                                （{subject.answeredQuestionCount} / {subject.totalQuestionCount} 問）
                                            </span>
                                        </div>
                                        <div className={styles.subjectCoverage__barTrack}>
                                            <div
                                                className={`${styles.subjectCoverage__barFill} ${getBarColorMod(percent)}`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SubjectCoverageGraph;